import { useEffect, useState } from "react";

function TarjetaNoticiaImagen({
  news,
  onGuardar,
  onLectura,
  guardada = false,
}) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {}, [news.image]);

  const shareUrl = news.articleUrl || window.location.href;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${news.titulo} - ${news.fuente}\n${shareUrl}`,
  )}`;

  const manejarGuardado = () => {
    onGuardar?.(news);
  };

  const manejarLectura = () => {
    onLectura?.(news);
  };

  return (
    <article
      className="card news-image-card h-100 rounded-4 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        color: "var(--text-body)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Imagen de la noticia */}
      {news.imagen && !imageError ? (
        <img
          src={news.imagen}
          className="card-img-top news-image-card-img"
          alt={news.titulo}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div
          className="news-image-card-placeholder d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "var(--bg-subtle)",
            color: "var(--text-muted)",
          }}
        >
          <div className="text-center">
            <i className="bi bi-image fs-1"></i>
            <p className="small mb-0">Imagen no disponible</p>
          </div>
        </div>
      )}

      <div className="card-body p-3 p-lg-4 d-flex flex-column">
        {/* Fuente y verificación */}
        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
          <span className="badge rounded-pill news-source">{news.fuente}</span>

          {news.verificado && (
            <span
              className="badge rounded-pill news-verified"
              style={{
                backgroundColor: "var(--verified-color)",
                color: "#FFFFFF",
              }}
            >
              <i className="bi bi-shield-check me-1"></i>
              Verificado
            </span>
          )}

          <span
            className="small ms-auto"
            style={{ color: "var(--text-muted)" }}
          >
            {news.categoria}
          </span>
        </div>

        {/* Titular */}
        <h3
          className="h5 new-title mb-2"
          style={{ color: "var(--text-headline)" }}
        >
          {news.titulo}
        </h3>

        {/* Resumen */}
        <p
          className="news-description mb-3"
          style={{ color: "var(--text-body)" }}
        >
          {news.descripcion}
        </p>

        <div className="mt-auto">
          <div className="small mb-3" style={{ color: "var(--text-muted)" }}>
            <i className="bi bi-clock me-1"></i>
            {news.fechaPublicacion
              ? new Date(news.fechaPublicacion).toLocaleDateString("es-PE")
              : news.time || "Fecha no disponible"}
          </div>

          <div className="d-flex align-items-center justify-content-between gap-2">
            <button
              type="button"
              className="btn btn-sm btn-primary rounded-pill px-3"
              onClick={manejarLectura}
            >
              Leer noticia
            </button>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-circle"
                onClick={manejarGuardado}
                aria-label={
                  guardada ? "Quitar de guardados" : "Guardar noticia"
                }
                title={guardada ? "Guardada" : "Guardar"}
              >
                <i className={`bi ${guardada ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-secondary rounded-circle"
                aria-label="Compartir por WhatsApp"
                title="Compartir por WhatsApp"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TarjetaNoticiaImagen;
