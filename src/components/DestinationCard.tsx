import { Link } from "react-router-dom";

interface DestinationCardProps {
  image: string;
  origem: string;
  destino: string;
  price: string;
}

const DestinationCard = ({ image, origem, destino, price }: DestinationCardProps) => {
  const today = new Date().toISOString().split("T")[0];
  const params = new URLSearchParams({
    origem,
    destino,
    data: today,
    adultos: "1",
    criancas: "0",
    colos: "0",
  });

  return (
    <Link
      to={`/resultados?${params.toString()}`}
      className="group block rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={destino}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="offer-badge absolute top-3 left-3">% CLICK OFERTA</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
          <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
          {origem}
        </div>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
          {destino}
        </div>
        <p className="text-xs text-muted-foreground">A partir de</p>
        <p className="text-xl font-bold text-foreground">R$ {price}</p>
      </div>
    </Link>
  );
};

export default DestinationCard;
