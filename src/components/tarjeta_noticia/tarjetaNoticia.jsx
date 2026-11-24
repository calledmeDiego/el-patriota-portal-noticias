// import { useState } from 'react';
import './tarjetaNoticia.css';

function TarjetaNoticia({ noticia, guardada, onGuardar, onLectura }) {
  const manejarLectura = () => {
    onLectura?.(noticia);
  };
  return (
    <article className="news-card">
      <div className="d-flex justify-content-between align-items-center news-meta">
        <div className="d-flex news-source">
          <span>{noticia.fuente}</span>
          <span>·</span>
          <span>{noticia.tiempo}</span>
        </div>

        {noticia.verificado && (
          <span className="verified-label">
            <i className="bi bi-patch-check-fill" />
            Verificado
          </span>
        )}
      </div>

      <span className="news-category">{noticia.categoria}</span>

      <h2 className="news-title">{noticia.titulo}</h2>

      <p className="news-description">{noticia.descripcion}</p>

      <div className="news-actions">
        <span className="reading-time">
          <i className="bi bi-clock" />
          {noticia.readingTime} de lectura
        </span>

        <div className="news-buttons">
          <button type="button" className="reading-button" onClick={manejarLectura}>
            Lectura limpia
          </button>

          <button
            type="button"
            className={`save-button ${guardada ? 'saved' : ''}`}
            onClick={() => onGuardar(noticia)}
            aria-pressed={guardada}
          >
            <i className={`bi ${guardada ? 'bi-bookmark-fill' : 'bi-bookmark'}`} />
            {guardada ? 'Guardado' : 'Guardar'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default TarjetaNoticia;