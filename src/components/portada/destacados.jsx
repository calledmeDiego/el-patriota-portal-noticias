
import NotaPortada from './notaPortada';
import './destacados.css';

function Destacados({
  noticia,
  posicion,
  total,
  onAnterior,
  onSiguiente,
  onGuardar,
  onLectura,
  guardada = false
}) {
  return (
    <section
      className="destacados"
      aria-label="Noticias destacadas"
    >
      <header className="destacados__header">
        <p className="destacados__titulo">
          Noticias destacadas
        </p>

        {total > 1 && (
          <div className="destacados__navegacion">
            <span
              className="visually-hidden"
              aria-live="polite"
            >
              Noticia {posicion + 1} de {total}
            </span>

            <button
              type="button"
              className="destacados__boton"
              onClick={onAnterior}
              aria-label="Noticia destacada anterior"
            >
              <i className="bi bi-arrow-left"></i>
            </button>

            <button
              type="button"
              className="destacados__boton"
              onClick={onSiguiente}
              aria-label="Noticia destacada siguiente"
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        )}
      </header>

      <div className="destacados__contenido">
        {noticia && (
          <NotaPortada
            noticia={noticia}
            onGuardar={onGuardar}
            guardada={guardada}
            principal
            onLectura={onLectura}
          />
        )}
      </div>
    </section>
  );
}

export default Destacados;
