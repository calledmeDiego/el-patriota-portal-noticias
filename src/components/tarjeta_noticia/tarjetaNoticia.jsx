// import { useState } from 'react';
import './tarjetaNoticia.css';

function TarjetaNoticia({ news, guardada, onGuardar }) {

  return (
    <article className="news-card">
      <div className="d-flex justify-content-between align-items-center news-meta">
        <div className="d-flex news-source">
          <span>{news.fuente}</span>
          <span>·</span>
          <span>{news.tiempo}</span>
        </div>

        {news.verificado && (
          <span className="verified-label">
            <i className="bi bi-patch-check-fill" />
            Verificado
          </span>
        )}
      </div>

      <span className="news-category">{news.categoria}</span>

      <h2 className="news-title">{news.titulo}</h2>

      <p className="news-description">{news.descripcion}</p>

      <div className="news-actions">
        <span className="reading-time">
          <i className="bi bi-clock" />
          {news.readingTime} de lectura
        </span>

        <div className="news-buttons">
          <button type="button" className="reading-button">
            Lectura limpia
          </button>

          <button
            type="button"
            className={`save-button ${guardada ? 'saved' : ''}`}
            onClick={() => onGuardar(news)}
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