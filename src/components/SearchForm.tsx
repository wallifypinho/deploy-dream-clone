import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowLeftRight, Calendar, Users, Search } from "lucide-react";

const CITIES = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Curitiba, PR",
  "Campinas, SP",
  "Salvador, BA",
  "Brasília, DF",
  "Florianópolis, SC",
  "Porto Alegre, RS",
  "Goiânia, GO",
];

const SearchForm = () => {
  const navigate = useNavigate();
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [tripType, setTripType] = useState<"ida" | "ida-volta">("ida");
  const [dataIda, setDataIda] = useState("");
  const [dataVolta, setDataVolta] = useState("");
  const [passageiros, setPassageiros] = useState(1);
  const [showOrigemSuggestions, setShowOrigemSuggestions] = useState(false);
  const [showDestinoSuggestions, setShowDestinoSuggestions] = useState(false);

  const filteredOrigem = CITIES.filter((c) =>
    c.toLowerCase().includes(origem.toLowerCase())
  );
  const filteredDestino = CITIES.filter((c) =>
    c.toLowerCase().includes(destino.toLowerCase())
  );

  const swapCities = () => {
    setOrigem(destino);
    setDestino(origem);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origem || !destino || !dataIda) return;

    const params = new URLSearchParams({
      origem,
      destino,
      data: dataIda,
      adultos: String(passageiros),
      criancas: "0",
      colos: "0",
    });
    if (tripType === "ida-volta" && dataVolta) {
      params.set("dataVolta", dataVolta);
    }
    navigate(`/resultados?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-card rounded-2xl shadow-xl p-6 max-w-4xl mx-auto relative z-10">
      <h2 className="text-lg font-bold text-foreground mb-4">
        Compre Sua Passagem de Ônibus Online
      </h2>

      {/* Origin / Destination */}
      <div className="flex items-center gap-0 border border-border rounded-xl overflow-visible mb-3 relative">
        <div className="flex-1 relative">
          <label className="text-xs text-muted-foreground px-4 pt-2 block">Origem</label>
          <div className="flex items-center px-4 pb-2">
            <MapPin className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
            <input
              type="text"
              placeholder="De onde você vai sair?"
              value={origem}
              onChange={(e) => { setOrigem(e.target.value); setShowOrigemSuggestions(true); }}
              onFocus={() => setShowOrigemSuggestions(true)}
              onBlur={() => setTimeout(() => setShowOrigemSuggestions(false), 200)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          {showOrigemSuggestions && origem && filteredOrigem.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              {filteredOrigem.map((city) => (
                <button
                  key={city}
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors"
                  onMouseDown={() => { setOrigem(city); setShowOrigemSuggestions(false); }}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={swapCities}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors"
        >
          <ArrowLeftRight className="w-4 h-4 text-primary" />
        </button>

        <div className="w-px bg-border self-stretch" />

        <div className="flex-1 relative">
          <label className="text-xs text-muted-foreground px-4 pt-2 block">Destino</label>
          <div className="flex items-center px-4 pb-2">
            <MapPin className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Para onde você vai?"
              value={destino}
              onChange={(e) => { setDestino(e.target.value); setShowDestinoSuggestions(true); }}
              onFocus={() => setShowDestinoSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDestinoSuggestions(false), 200)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          {showDestinoSuggestions && destino && filteredDestino.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              {filteredDestino.map((city) => (
                <button
                  key={city}
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors"
                  onMouseDown={() => { setDestino(city); setShowDestinoSuggestions(false); }}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Trip Type */}
      <div className="flex items-center gap-4 mb-3">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            checked={tripType === "ida"}
            onChange={() => setTripType("ida")}
            className="accent-primary"
          />
          Somente Ida
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            checked={tripType === "ida-volta"}
            onChange={() => setTripType("ida-volta")}
            className="accent-primary"
          />
          Ida e Volta
        </label>
      </div>

      {/* Date / Passengers / Search */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="flex-1 border border-border rounded-xl px-4 py-2">
          <label className="text-xs text-muted-foreground block">Ida</label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="date"
              value={dataIda}
              onChange={(e) => setDataIda(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              required
            />
          </div>
        </div>

        <div className={`flex-1 border border-border rounded-xl px-4 py-2 ${tripType === "ida" ? "opacity-50" : ""}`}>
          <label className="text-xs text-muted-foreground block">Volta</label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="date"
              value={dataVolta}
              onChange={(e) => setDataVolta(e.target.value)}
              disabled={tripType === "ida"}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex-1 border border-border rounded-xl px-4 py-2">
          <label className="text-xs text-muted-foreground block">Passageiros</label>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground shrink-0" />
            <select
              value={passageiros}
              onChange={(e) => setPassageiros(Number(e.target.value))}
              className="w-full bg-transparent text-sm outline-none"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} passageiro{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 justify-center"
        >
          <Search className="w-4 h-4" />
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
