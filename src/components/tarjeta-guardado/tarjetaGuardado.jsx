
import "./tarjetaGuardado.css";
const formatoFecha = new Intl.DateTimeFormat("es-PE", {
  dateStyle: "medium",
  timeZone: "UTC",
});

function TarjetaGuardado({
  noticia,
  onLeer,
  onVerificar,
  onQuitar,
}) {
  const {
    titulo,
    fechaPublicacion,
    fuente,
    descripcion,
    url,
  } = noticia;

  const fechaValida =
    fechaPublicacion &&
    !Number.isNaN(new Date(fechaPublicacion).getTime());

  return (
    <article className="card tarjeta-guardado h-100 border-0 rounded-3">
      <div className="card-body tarjeta-guardado__body p-3 p-md-4">

        {/* Cabecera */}
        <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
          <span className="tarjeta-guardado__fuente text-uppercase fw-bold small">
            <i className="bi bi-newspaper me-2"></i>
            {fuente}
          </span>

          <button
            type="button"
            className="btn btn-sm tarjeta-guardado__verificar text-uppercase fw-bold"
            onClick={onVerificar}
          >
            <i className="bi bi-shield-check me-1"></i>
            Verificación
          </button>
        </div>

        {/* Contenido */}
        <h2 className="card-title tarjeta-guardado__titulo">
          {titulo}
        </h2>

        {fechaValida && (
          <time
            className="d-block small tarjeta-guardado__fecha mb-3"
            dateTime={fechaPublicacion}
          >
            <i className="bi bi-calendar3 me-2"></i>
            {formatoFecha.format(new Date(fechaPublicacion))}
          </time>
        )}

        <p className="card-text tarjeta-guardado__descripcion">
          {descripcion}
        </p>

        {/* Acciones */}
        <div className="tarjeta-guardado__acciones d-flex flex-wrap align-items-center gap-2 pt-3 mt-auto">

          <button
            type="button"
            className="btn btn-dark tarjeta-guardado__leer"
            onClick={onLeer}
          >
            Leer noticia
            <i className="bi bi-arrow-right ms-2"></i>
          </button>

          <button
            type="button"
            className="btn btn-outline-danger tarjeta-guardado__quitar"
            aria-pressed="true"
            onClick={onQuitar}
          >
            <i className="bi bi-bookmark-check-fill me-1"></i>
            Guardado
          </button>

          {url && (
            <a
              className="tarjeta-guardado__enlace fw-bold ms-md-auto"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar medio
              <i className="bi bi-box-arrow-up-right ms-2"></i>
            </a>
          )}

        </div>
      </div>
    </article>
  );
}

export default TarjetaGuardado;
