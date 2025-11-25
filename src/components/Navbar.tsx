import { NavLink } from "./NavLink";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold text-primary">
          ПрофОрієнтація
        </NavLink>
        
        <div className="hidden md:flex items-center gap-6">
          <NavLink 
            to="/" 
            className="text-foreground/80 hover:text-primary transition-colors"
            activeClassName="text-primary font-semibold"
          >
            Головна
          </NavLink>
          <NavLink 
            to="/test" 
            className="text-foreground/80 hover:text-primary transition-colors"
            activeClassName="text-primary font-semibold"
          >
            Тест профорієнтації
          </NavLink>
          <NavLink 
            to="/strengths" 
            className="text-foreground/80 hover:text-primary transition-colors"
            activeClassName="text-primary font-semibold"
          >
            Підбір університету
          </NavLink>
        </div>

        <NavLink to="/test">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Пройти тест
          </Button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
