const sources = [
  'Todos',
  'El Comercio',
  'RPP Noticias',
  'Google News',
];

function Filtrado({ activeSource, onSourceChange }) {
  return (
    <section className="source-filter">
      <span className="filter-label">Filtrar por fuente autorizada</span>

      <div className="source-options">
        {sources.map((source) => (
          <button
            key={source}
            type="button"
            className={`source-option ${
              activeSource === source ? 'active' : ''
            }`}
            onClick={() => onSourceChange(source)}
          >
            {source}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Filtrado;