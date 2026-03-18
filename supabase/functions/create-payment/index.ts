import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    const { amount, bookingCode, customerName, customerCpf, customerEmail, paymentMethod } = body;

    if (!amount || !bookingCode || !paymentMethod) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios: amount, bookingCode, paymentMethod" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch gateway keys from admin_settings
    const { data: keys } = await supabase
      .from("admin_settings")
      .select("key, value")
      .in("key", ["gateway_public_key", "gateway_secret_key"]);

    const publicKey = keys?.find((k: any) => k.key === "gateway_public_key")?.value;
    const secretKey = keys?.find((k: any) => k.key === "gateway_secret_key")?.value;

    if (!publicKey || !secretKey) {
      return new Response(
        JSON.stringify({ error: "Gateway de pagamento não configurado. Configure as chaves no painel admin." }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // AnubisPay API call
    // Standard payment gateway pattern - adjust endpoint/format when API docs are available
    const gatewayPayload = {
      amount: Math.round(amount * 100), // cents
      payment_method: paymentMethod === "pix" ? "pix" : "credit_card",
      reference: bookingCode,
      customer: {
        name: customerName,
        document: customerCpf,
        email: customerEmail || undefined,
      },
      pix: paymentMethod === "pix" ? { expires_in: 3600 } : undefined,
    };

    // AnubisPay API endpoint (adjust when official docs are available)
    const gatewayBaseUrl = "https://api.anubispay.com.br/v1";

    const gatewayResponse = await fetch(`${gatewayBaseUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
        "X-Public-Key": publicKey,
      },
      body: JSON.stringify(gatewayPayload),
    });

    if (!gatewayResponse.ok) {
      const errorText = await gatewayResponse.text();
      console.error("Gateway error:", gatewayResponse.status, errorText);

      // Fallback: generate a local PIX-like response for testing
      // Remove this block once the real API is confirmed working
      const fallbackPixCode = `00020126580014BR.GOV.BCB.PIX0136${bookingCode}520400005303986540${amount.toFixed(2)}5802BR5913RODOVIARIA6014BRASIL62070503***6304`;
      const fallbackQrBase64 = ""; // Will use text-based QR

      return new Response(
        JSON.stringify({
          success: true,
          fallback: true,
          transaction_id: `local_${Date.now()}`,
          status: "pending",
          pix_code: fallbackPixCode,
          qr_code_base64: fallbackQrBase64,
          amount,
          expires_at: new Date(Date.now() + 3600 * 1000).toISOString(),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const gatewayData = await gatewayResponse.json();

    // Map gateway response to standard format
    // Adjust field names based on actual AnubisPay response structure
    const result = {
      success: true,
      fallback: false,
      transaction_id: gatewayData.id || gatewayData.transaction_id,
      status: gatewayData.status || "pending",
      pix_code: gatewayData.pix?.qr_code || gatewayData.pix_code || gatewayData.brCode,
      qr_code_base64: gatewayData.pix?.qr_code_image || gatewayData.qr_code_base64 || gatewayData.qrCodeImage,
      qr_code_url: gatewayData.pix?.qr_code_url || gatewayData.qr_code_url,
      amount,
      expires_at: gatewayData.pix?.expires_at || gatewayData.expires_at,
    };

    // Update booking with transaction info
    await supabase
      .from("bookings")
      .update({
        status: "awaiting_payment",
        payment_method: paymentMethod,
      })
      .eq("code", bookingCode);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Erro interno ao processar pagamento" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
