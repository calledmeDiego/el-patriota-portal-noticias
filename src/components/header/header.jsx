import "./header.css";
import { Link } from "react-router-dom";

function Header({ theme, cambiarTema }) {
  const isDark = theme === "dark";

  return (
    <header className="site-header mx-5">
      <div className="d-flex justify-content-between text-uppercase header-top">
        <span>Lima, Perú · Edición Digital</span>
        <span className="header-edition">Portal de noticias</span>
      </div>

      <div className="d-flex justify-content-between align-items-center header-main">
        <div className="brand">
          <Link to="/" aria-label="El Patriota, inicio">
            EL<span>·</span>PATRIOTA
            <small>Portal de actualidad y contraste</small>
          </Link>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="header-icon"
            onClick={cambiarTema}
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
            title={isDark ? "Modo claro" : "Modo oscuro"}
          >
            <i className={`bi ${isDark ? "bi-sun" : "bi-moon"}`} />
          </button>
          <Link to="/registrar" className="header-icon">
            <i className="bi bi-person" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
