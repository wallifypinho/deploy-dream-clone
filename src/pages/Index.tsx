import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import DestinationCard from "@/components/DestinationCard";
import HomeSections from "@/components/HomeSections";

const offers1 = [
  { image: "/images/dest-rio.webp", origem: "São Paulo, SP", destino: "Rio de Janeiro, RJ", price: "25,00" },
  { image: "/images/dest-sp.webp", origem: "Rio de Janeiro, RJ", destino: "São Paulo, SP", price: "25,00" },
  { image: "/images/dest-bh.webp", origem: "São Paulo, SP", destino: "Belo Horizonte, MG", price: "30,88" },
  { image: "/images/dest-rio.webp", origem: "Belo Horizonte, MG", destino: "Rio de Janeiro, RJ", price: "25,00" },
];

const offers2 = [
  { image: "/images/dest-rio.webp", origem: "São Paulo, SP", destino: "Rio de Janeiro, RJ", price: "25,00" },
  { image: "/images/dest-bh.webp", origem: "São Paulo, SP", destino: "Belo Horizonte, MG", price: "30,88" },
  { image: "/images/dest-cwb.webp", origem: "São Paulo, SP", destino: "Curitiba, PR", price: "27,99" },
  { image: "/images/dest-bh.webp", origem: "Rio de Janeiro, RJ", destino: "Belo Horizonte, MG", price: "25,00" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative brand-gradient-hero overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/[0.06] blur-2xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/[0.04] blur-2xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-white/[0.03] blur-3xl" />
        </div>

        {/* Hero content */}
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 pt-10 pb-28 md:pt-14 md:pb-32 lg:pt-16 lg:pb-36">
            {/* Left side - promo text */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-primary-foreground text-[11px] md:text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                🎉 Semana do Consumidor
              </span>
              <h1 className="text-primary-foreground text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-extrabold leading-[1.15] tracking-tight">
                A hora é agora
                <br />
                e não volta mais!
              </h1>
            </div>

            {/* Right side - discount block */}
            <div className="flex-shrink-0">
              <div className="relative bg-white/15 backdrop-blur-md rounded-2xl px-8 py-6 md:px-10 md:py-8 text-center min-w-[180px] md:min-w-[220px] border border-white/20 shadow-lg">
                {/* Subtle glow behind block */}
                <div className="absolute inset-0 rounded-2xl bg-white/[0.05] blur-xl -z-10" />
                <p className="text-primary-foreground text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight">
                  50%
                </p>
                <p className="text-primary-foreground text-2xl md:text-3xl font-extrabold uppercase -mt-1">
                  OFF
                </p>
                <div className="mt-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-white/10">
                  <span className="text-[10px] md:text-xs text-primary-foreground/70 uppercase tracking-wider font-medium block">
                    cupom
                  </span>
                  <p className="text-primary-foreground text-sm md:text-base font-bold tracking-[0.15em]">
                    SOHOJE50
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SearchForm floating over hero bottom */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20">
          <div className="container">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Spacer for search form overlap */}
      <div className="h-48 md:h-56 lg:h-52" />

      {/* Best Prices */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Passagens de Ônibus com os Melhores Preços
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offers1.map((o, i) => (
              <DestinationCard key={`best-${i}`} {...o} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12 bg-muted">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Passagens de Ônibus para Destinos Populares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offers2.map((o, i) => (
              <DestinationCard key={`pop-${i}`} {...o} />
            ))}
          </div>
        </div>
      </section>

      <HomeSections />
    </div>
  );
};

export default Index;
