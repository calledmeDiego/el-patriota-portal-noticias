
import { useState } from "react";
import "./contrasteMedios.css";

function ContrasteMedios({ contraste, onContrastar }) {
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => {
    setModalAbierto(true);
    onContrastar?.(contraste);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <>
      <section
        className="contraste-medios"
        aria-label="Contraste de medios"
      >
        <header className="contraste-medios__header">
          <p className="contraste-medios__etiqueta">
            Un hecho, varios medios
          </p>

          <h2 className="contraste-medios__titulo">
            {contraste.titulo}
          </h2>
        </header>

        <div className="row g-0 contraste-medios__lista">
          {contraste.medios.map(({ nombre, enfoque }) => (
            <div
              className="col-6 contraste-medios__medio"
              key={nombre}
            >
              <h3 className="contraste-medios__nombre">
                {nombre}
              </h3>

              <p className="contraste-medios__enfoque">
                {enfoque}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="contraste-medios__boton"
          onClick={abrirModal}
        >
          Contrastar noticias · {contraste.medios.length} medios
          <i className="bi bi-arrow-right ms-2"></i>
        </button>
      </section>

      {/* Modal de contraste */}
      {modalAbierto && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={cerrarModal}
          />

          <div
            className="modal modal-contraste fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-contraste-titulo"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content modal-contraste__contenido">

                {/* Cabecera */}
                <div className="modal-header modal-contraste__header">
                  <span className="modal-contraste__etiqueta text-uppercase fw-semibold small">
                    Un hecho, varios medios
                  </span>

                  <button
                    type="button"
                    className="btn-close modal-contraste__cerrar"
                    aria-label="Cerrar"
                    onClick={cerrarModal}
                  />
                </div>

                {/* Contenido */}
                <div className="modal-body modal-contraste__body">
                  <h1
                    id="modal-contraste-titulo"
                    className="modal-title modal-contraste__titulo"
                  >
                    {contraste.titulo}
                  </h1>

                  {/* Comparación de medios */}
                  <div className="row g-0 modal-contraste__medios">
                    {contraste.medios.map(({ nombre, enfoque }) => (
                      <div
                        className="col-12 col-md-6 modal-contraste__medio"
                        key={nombre}
                      >
                        <h2 className="modal-contraste__nombre text-uppercase fw-semibold">
                          {nombre}
                        </h2>

                        <p className="modal-contraste__enfoque mb-0">
                          {enfoque}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Puntos en común */}
                  <section className="modal-contraste__comunes">
                    <h2 className="modal-contraste__subtitulo">
                      Puntos en común
                    </h2>

                    {contraste.puntosComunes?.length > 0 ? (
                      <ul className="modal-contraste__lista">
                        {contraste.puntosComunes.map((punto, index) => (
                          <li key={index}>{punto}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-body-secondary">
                        No hay puntos en común registrados.
                      </p>
                    )}
                  </section>

                  {/* Descripción */}
                  {contraste.descripcion && (
                    <p className="modal-contraste__descripcion mb-0">
                      {contraste.descripcion}
                    </p>
                  )}
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ContrasteMedios;
