
import ModalSubscripcion from '../modal-subscripcion/modalSubscripcion';
import "./footer.css";
function Footer({ theme }) {
  return (
    <footer className="patriota-footer mt-5">

      <div className="container-fluid px-0">

        <div className="row g-4 align-items-start">

          {/* Marca y propuesta de valor */}
          <div className="col-12 col-md-5 col-lg-6">

            <h2 className="footer-brand">
              EL PATRIOTA<span>.</span>
            </h2>

            <p className="footer-description">
              Información verificada y sin ruido.
              Reunimos noticias de diferentes medios para
              que puedas informarte con claridad y contexto.
            </p>

            <span className="footer-trust">
              <i className="bi bi-shield-check me-2"></i>
              Transparencia y atribución de fuentes.
            </span>

          </div>

          {/* Información */}
          <div className="col-12 col-md-7 col-lg-6">

            <h3 className="footer-heading">
              Información
            </h3>

            <ul className="footer-links">
              <li>
                <a href="#about">Sobre nosotros</a>
              </li>
              <li>
                <a href="#privacy">Política de privacidad</a>
              </li>
              <li>
                <a href="#terms">Términos de uso</a>
              </li>
              <li>
                <a href="#sources">Política de fuentes</a>
              </li>
            </ul>
            <ModalSubscripcion theme={theme}/>

          </div>

        </div>

        {/* Pie inferior */}
        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} El Patriota.
            Todos los derechos reservados.
          </p>

          <p>
            Respetamos la autoría y las fuentes originales
            de cada noticia.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
