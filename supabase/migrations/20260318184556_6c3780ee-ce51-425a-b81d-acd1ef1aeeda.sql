
-- Bookings table to store all reservations
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  nome text NOT NULL,
  cpf text NOT NULL,
  email text,
  whatsapp text,
  origem text NOT NULL,
  destino text NOT NULL,
  data_viagem date NOT NULL,
  departure text NOT NULL,
  arrival text NOT NULL,
  company text NOT NULL,
  seat_type text NOT NULL,
  seats text NOT NULL,
  price_per_seat numeric(10,2) NOT NULL,
  total numeric(10,2) NOT NULL,
  payment_method text NOT NULL DEFAULT 'pix',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Admin passwords table
CREATE TABLE public.admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Insert default admin password
INSERT INTO public.admin_settings (key, value) VALUES ('admin_password', 'admin123');
INSERT INTO public.admin_settings (key, value) VALUES ('user_password', 'user123');

-- RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Anyone can update bookings" ON public.bookings FOR UPDATE USING (true);
CREATE POLICY "Anyone can read admin_settings" ON public.admin_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can update admin_settings" ON public.admin_settings FOR UPDATE USING (true);
