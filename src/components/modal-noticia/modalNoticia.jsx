import { useEffect, useState } from "react";
import "./modalNoticia.css";

function ModalNoticia({ noticia, onCerrar, onGuardar, guardada = false }) {
  const [tamanoTexto, setTamanoTexto] = useState(18);

  useEffect(() => {
    if (!noticia) return;

    const manejarEscape = (event) => {
      if (event.key === "Escape") {
        onCerrar?.();
      }
    };

    window.addEventListener("keydown", manejarEscape);

    return () => {
      window.removeEventListener("keydown", manejarEscape);
    };
  }, [noticia, onCerrar]);

  if (!noticia) return null;

  const { titulo, fuente, descripcion, url, articleUrl } = noticia;
  const enlaceNoticia = articleUrl || url;

  const disminuirTexto = () => {
    setTamanoTexto((actual) => Math.max(14, actual - 2));
  };

  const aumentarTexto = () => {
    setTamanoTexto((actual) => Math.min(28, actual + 2));
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onCerrar} />

      <div
        className="modal modal-noticia fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-noticia-titulo"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            {/* Cabecera */}
            <div className="modal-header modal-noticia__header">
              <span className="modal-noticia__fuente text-uppercase fw-semibold small">
                Resumen de la noticia · {fuente}
              </span>

              <button
                type="button"
                className="btn-close modal-noticia__cerrar"
                aria-label="Cerrar"
                onClick={onCerrar}
              />
            </div>

            {/* Contenido */}
            <div className="modal-body modal-noticia__body">
              <h1
                id="modal-noticia-titulo"
                className="modal-title modal-noticia__titulo"
              >
                {titulo}
              </h1>

              <div
                className="modal-noticia__texto"
                style={{ fontSize: `${tamanoTexto}px` }}
              >
                <p>{descripcion}</p>
              </div>
            </div>

            {/* Acciones */}

            {/* Acciones */}
            <div className="modal-footer modal-noticia__footer justify-content-start">
              {/* Tamaño del texto */}
              <div
                className="btn-group modal-noticia__controles"
                role="group"
                aria-label="Tamaño del texto"
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={disminuirTexto}
                  disabled={tamanoTexto <= 14}
                  aria-label="Disminuir tamaño del texto"
                  title="Disminuir texto"
                >
                  A−
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={aumentarTexto}
                  disabled={tamanoTexto >= 28}
                  aria-label="Aumentar tamaño del texto"
                  title="Aumentar texto"
                >
                  A+
                </button>
              </div>

              {/* Guardar noticia */}
              <button
                type="button"
                className="btn btn-outline-secondary modal-noticia__guardar"
                onClick={() => onGuardar?.(noticia)}
                aria-pressed={guardada}
              >
                <i
                  className={`bi ${guardada ? "bi-bookmark-fill" : "bi-bookmark"} me-1`}
                />
                {guardada ? "Guardado" : "Guardar"}
              </button>

              {/* Enlace original */}
              {enlaceNoticia && (
                <a
                  href={enlaceNoticia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-noticia__enlace fw-semibold"
                >
                  Visitar el medio
                  <i className="bi bi-box-arrow-up-right ms-1" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalNoticia;
