import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode, CreditCard } from "lucide-react";

const Pagamento = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const origem = searchParams.get("origem") || "";
  const destino = searchParams.get("destino") || "";
  const price = parseFloat(searchParams.get("price") || "0");
  const seats = searchParams.get("seats") || "";
  const total = price * (seats.split(",").length || 1);

  const [method, setMethod] = useState<"pix" | "card" | null>(null);

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams);
    params.set("paymentMethod", method || "pix");
    navigate(`/confirmacao?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="brand-gradient text-primary-foreground py-3 px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <p className="font-semibold">Forma de Pagamento</p>
            <p className="text-xs opacity-80">{origem} → {destino}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full p-4">
        <h2 className="text-lg font-bold text-center text-foreground mt-4 mb-1">Escolha a forma de pagamento</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">Selecione como deseja pagar sua passagem</p>

        <div className="space-y-3">
          <button
            onClick={() => setMethod("pix")}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
              method === "pix" ? "border-primary bg-accent/30" : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <QrCode className="w-8 h-8 text-foreground shrink-0" />
            <div>
              <p className="font-bold text-foreground">PIX</p>
              <p className="text-xs text-muted-foreground">Pagamento instantâneo · Aprovação imediata</p>
            </div>
          </button>

          <button
            onClick={() => setMethod("card")}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
              method === "card" ? "border-primary bg-accent/30" : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <CreditCard className="w-8 h-8 text-foreground shrink-0" />
            <div>
              <p className="font-bold text-foreground">Cartão de Crédito</p>
              <p className="text-xs text-muted-foreground">Em até 12x · Todas as bandeiras</p>
            </div>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between bg-card border border-border rounded-xl p-4">
          <span className="text-sm text-muted-foreground">Valor Total</span>
          <span className="text-xl font-bold text-foreground">R$ {total.toFixed(2).replace(".", ",")}</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 p-4 max-w-lg mx-auto w-full">
        <button
          onClick={handleContinue}
          disabled={!method}
          className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-lg text-sm uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Pagamento;
