import { Link } from "react-router-dom";
import { Tag, ClipboardList, HelpCircle, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="ClickBus" className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Tag className="w-4 h-4" />
            Ofertas
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ClipboardList className="w-4 h-4" />
            Pedidos
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <HelpCircle className="w-4 h-4" />
            Ajuda
          </Link>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors">
            <User className="w-4 h-4" />
            Entrar
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
