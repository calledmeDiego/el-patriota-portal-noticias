
import "./notaPortada.css";

function NotaPortada({
  noticia,
  principal = false,
  onSeleccionar,
  onGuardar,
  guardada = false
}) {
  const {
    titulo,
    fecha,
    source,
    descripcion,
    imagen,
    url,
    fichaVerificacion
  } = noticia;

  return (
    <article className={`nota-portada
    ${principal ? 'nota-portada--principal' : 'nota-portada--secundaria'}
  `}>
      <div className="nota-portada__contenido">

        <div className="nota-portada__encabezado">
          <span className="nota-portada__fuente">
            {source}
          </span>

          
            <a
              href={fichaVerificacion}
              target="_blank"
              rel="noopener noreferrer"
              className="nota-portada__verificacion"
            >
              <i className="bi bi-patch-check-fill me-1"></i>
              Ficha de verificación
            </a>
        </div>

        <div className="nota-portada__titulo">
          {onSeleccionar ? (
            <button
              type="button"
              className="nota-portada__titulo-button"
              onClick={onSeleccionar}
            >
              {titulo}
            </button>
          ) : (
            <h2>{titulo}</h2>
          )}
        </div>

        <time className="nota-portada__fecha" dateTime={fecha}>
          {fecha}
        </time>

        {principal && imagen && (
          <figure className="nota-portada__figura">
            <img
              className="nota-portada__imagen"
              src={imagen.src}
              srcSet={imagen.srcSet}
              alt={imagen.alt}
            />

            {imagen.pie && (
              <figcaption className="nota-portada__pie">
                {imagen.pie}
              </figcaption>
            )}
          </figure>
        )}

        {descripcion && (
          <p className="nota-portada__descripcion">
            {descripcion}
          </p>
        )}

        <div className="nota-portada__acciones">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm nota-portada__btn nota-portada__btn--leer"
            >
              Leer noticia
              <i className="bi bi-arrow-up-right ms-2"></i>
            </a>
          )}

          <button
            type="button"
            className="btn btn-sm nota-portada__btn"
            onClick={() => onGuardar?.(noticia)}
            aria-pressed={guardada}
          >
            <i className={`bi ${guardada ? 'bi-bookmark-fill' : 'bi-bookmark'} me-1`}></i>
            {guardada ? 'Guardada' : 'Guardar'}
          </button>

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="nota-portada__visitar"
            >
              Visitar el medio
              <i className="bi bi-arrow-up-right ms-1"></i>
            </a>
          )}
        </div>

      </div>
    </article>
  );
}

export default NotaPortada;
