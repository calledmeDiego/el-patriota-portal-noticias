
import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import './modalSubscripcion.css';

const SESSION_KEY = 'patriota_conversion_modal_shown';

function ModalSubscripcion({
  theme = 'light',
  onSubscribe
}) {
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null);
  const autoTriggeredRef = useRef(false);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Comprueba si el modal ya apareció durante esta sesión.
  const yaAparecio = () => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  };

  // Registra que el modal ya fue mostrado.
  const yaFueMostrado = () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    autoTriggeredRef.current = true;
  };

  // Abre el modal.
  const abrirModal = () => {
    if (!modalInstanceRef.current) return;

    yaFueMostrado();
    modalInstanceRef.current.show();
  };

  // Inicializa Bootstrap y detecta el final de la página.
  useEffect(() => {
    const modalElement = modalRef.current;

    if (!modalElement) return;

    // Crear la instancia nativa de Bootstrap.
    const modalInstance = Modal.getOrCreateInstance(modalElement);

    modalInstanceRef.current = modalInstance;

    // Evitar mostrarlo automáticamente otra vez.
    if (yaAparecio()) {
      autoTriggeredRef.current = true;
      return () => {
        modalInstance.dispose();
        modalInstanceRef.current = null;
      };
    }

    // Comprueba cuánto falta para llegar al final.
    const manejarScroll = () => {
      const scrollPosition =
        window.scrollY + window.innerHeight;

      const pageHeight =
        document.documentElement.scrollHeight;

      const distanceToBottom = pageHeight - scrollPosition;

      // Mostrar cuando falten 120px o menos.
      if (
        distanceToBottom <= 120 &&
        !autoTriggeredRef.current
      ) {
        yaFueMostrado();
        modalInstance.show();

        window.removeEventListener('scroll', manejarScroll);
      }
    };

    window.addEventListener('scroll', manejarScroll, {
      passive: true
    });

    // También comprobar si la página ya está en el fondo.
    manejarScroll();

    // Limpiar el evento y la instancia al desmontar.
    return () => {
      window.removeEventListener('scroll', manejarScroll);
      modalInstance.dispose();
      modalInstanceRef.current = null;
    };
  }, []);

  // Procesar el formulario de suscripción.
  const manejarSubscripcion = async (event) => {
    event.preventDefault();

    setMessage('');
    setIsSubmitting(true);

    try {
      if (!onSubscribe) {
        setMessage(
          'El formulario está listo. Falta conectar el servicio de suscripción.'
        );
        return;
      }

      await onSubscribe(email);

      setMessage('¡Gracias! Tu solicitud fue recibida.');
      setEmail('');
    } catch (error) {
      setMessage(
        'No pudimos procesar tu solicitud. Inténtalo nuevamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center py-4">
        <button
          type="button"
          className="btn btn-outline-primary rounded-pill px-4"
          onClick={abrirModal}
        >
          <i className="bi bi-envelope me-2"></i>
          Recibe nuestro boletín gratuito
        </button>
      </div>

      {/* Modal nativo de Bootstrap */}
      <div
        className="modal fade subscription-modal"
        ref={modalRef}
        tabIndex="-1"
        aria-labelledby="conversionModalTitle"
        aria-hidden="true"
        data-bs-theme={theme}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content subscription-modal-content">

            <div className="modal-header border-0 pb-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>

            <div className="modal-body subscription-modal-body">
              <div className="subscription-panel">
                <div className="subscription-panel-body">

                  <div className="row align-items-center subscription-grid">

                    {/* COLUMNA IZQUIERDA */}
                    <div className="col-lg-7 subscription-main">

                      <span className="badge rounded-pill text-bg-primary mb-3">
                        INFORMACIÓN SIN RUIDO
                      </span>

                      <h2
                        className="display-6 fw-bold text-body mb-3"
                        id="conversionModalTitle"
                      >
                        Mantente informado.
                        <br />
                        Sin perder el tiempo.
                      </h2>

                      <p className="lead text-body-secondary mb-4">
                        Las noticias importantes, de medios
                        confiables y en un solo lugar.
                        Recibe nuestro boletín diario gratuito
                        y mantente al tanto de lo que realmente
                        importa.
                      </p>

                      {/* Formulario */}
                      <form onSubmit={manejarSubscripcion}>

                        <label
                          htmlFor="newsletterEmail"
                          className="form-label fw-semibold"
                        >
                          Tu correo electrónico
                        </label>

                        <div className="input-group input-group-lg mb-3">
                          <input
                            type="email"
                            id="newsletterEmail"
                            className="form-control"
                            placeholder="nombre@correo.com"
                            value={email}
                            onChange={(event) =>
                              setEmail(event.target.value)
                            }
                            required
                          />

                          <button
                            type="submit"
                            className="btn btn-primary px-3"
                            disabled={isSubmitting}
                          >
                            {isSubmitting
                              ? 'Enviando...'
                              : 'Suscribirme'}
                          </button>
                        </div>

                        <div
                          className="form-text mb-3"
                        >
                          Boletín gratuito. Sin publicidad invasiva.
                        </div>

                        {message && (
                          <div
                            className="alert alert-info py-2"
                            role="status"
                          >
                            {message}
                          </div>
                        )}

                      </form>


                    </div>

                    {/* COLUMNA DERECHA */}
                    <div className="col-lg-5 subscription-aside">

                      <div className="card border rounded-4 shadow-sm bg-body">

                        <div className="card-body p-4 subscription-example">

                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="badge text-bg-success">
                              UN HECHO, VARIOS MEDIOS
                            </span>

                            <i className="bi bi-newspaper fs-4 text-body-secondary"></i>
                          </div>

                          <h5 className="fw-bold text-body mb-3">
                            Una noticia. Diferentes perspectivas.
                          </h5>

                          <p className="text-body-secondary small">
                            Consulta cómo distintos medios
                            informan sobre un mismo acontecimiento.
                          </p>

                          <div className="border rounded-3 p-3 mb-3">
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <span className="badge text-bg-secondary">
                                El Comercio
                              </span>

                              <small className="text-body-secondary">
                                Economía
                              </small>
                            </div>

                            <p className="fw-semibold text-body mb-0">
                              Congreso debate reforma del sistema
                              de pensiones.
                            </p>
                          </div>

                          <div className="border rounded-3 p-3 mb-3">
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <span className="badge text-bg-secondary">
                                RPP Noticias
                              </span>

                              <small className="text-body-secondary">
                                Actualidad
                              </small>
                            </div>

                            <p className="fw-semibold text-body mb-0">
                              Diferentes propuestas sobre el futuro
                              de las pensiones.
                            </p>
                          </div>

                          <div className="d-flex align-items-center gap-2 text-success small">
                            <i className="bi bi-shield-check fs-5"></i>
                            <span>
                              Fuentes y atribución claramente identificadas.
                            </span>
                          </div>

                        </div>
                      </div>

                      {/* Beneficios */}
                     

                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ModalSubscripcion;
