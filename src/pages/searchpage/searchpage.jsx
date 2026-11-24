import { useMemo, useState } from "react";
import { newsData } from "../../data/noticias";

import TarjetaNoticiaImagen from "../../components/tarjeta-noticia-imagen/tarjetaNoticiaImagen";
import "./searchpage.css";
import useGuardados from "../../hooks/useGuardados";
import ModalNoticia from "../../components/modal-noticia/modalNoticia";

const categories = [
  "Portada",
  "Política",
  "Economía",
  "Deportes",
  "Tecnología",
  "Cultura",
  "Actualidad Nacional",
  "Mundo",
];

const sources = ["Todos", "El Comercio", "RPP Noticias", "Google News"];

const timeOptions = [
  { value: "all", label: "Todo el tiempo" },
  { value: "24h", label: "Últimas 24 h" },
  { value: "week", label: "Esta semana" },
  { value: "month", label: "Último mes" },
];

function SearchPage() {
  const { estaGuardada, alternarGuardado } = useGuardados();
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [activeCategory, setActiveCategory] = useState("Portada");
  const [activeSource, setActiveSource] = useState("Todos");
  const [timeRange, setTimeRange] = useState("all");

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("patriota_recent_searches") || "[]",
      );
    } catch {
      return [];
    }
  });

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    if (!query) return;

    // Ejecutar búsqueda
    setSearchQuery(query);

    // Guardar historial
    const updatedSearches = [
      query,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== query.toLowerCase(),
      ),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);

    localStorage.setItem(
      "patriota_recent_searches",
      JSON.stringify(updatedSearches),
    );
  };

  // Recuperar una búsqueda reciente.
  const selectRecentSearch = (query) => {
    setSearchTerm(query);
  };

  // Limpiar todos los filtros.
  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("Portada");
    setActiveSource("Todos");
    setTimeRange("all");
  };

  // Calcular resultados según los filtros seleccionados.
  const filteredNews = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return newsData.filter((news) => {
      const matchesSearch =
        !normalizedSearch ||
        news.titulo?.toLowerCase().includes(normalizedSearch) ||
        news.descripcion?.toLowerCase().includes(normalizedSearch) ||
        news.categoria?.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        activeCategory === "Portada" || news.categoria === activeCategory;

      const matchesSource =
        activeSource === "Todos" || news.fuente === activeSource;

      // Para los filtros temporales se necesita publishedAt.
      let matchesTime = true;

      if (timeRange !== "all" && news.fechaPublicacion) {
        const publishedDate = new Date(news.fechaPublicacion);
        const now = new Date();

        const hoursDifference =
          (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60);

        if (timeRange === "24h") {
          matchesTime = hoursDifference >= 0 && hoursDifference <= 24;
        }

        if (timeRange === "week") {
          matchesTime = hoursDifference >= 0 && hoursDifference <= 168;
        }

        if (timeRange === "month") {
          matchesTime = hoursDifference >= 0 && hoursDifference <= 720;
        }
      } else if (timeRange !== "all" && !news.fechaPublicacion) {
        matchesTime = false;
      }

      return matchesSearch && matchesCategory && matchesSource && matchesTime;
    });
  }, [searchQuery, activeCategory, activeSource, timeRange]);

  return (
    <main className="search-page py-4">
      {/* Título y descripción */}
      <div className="mb-4">
        <h2
          className="fw-bold mb-2 search-heading"
          style={{ color: "var(--text-headline)" }}
        >
          Explora las noticias
        </h2>

        <p className="mb-0" style={{ color: "var(--text-muted)" }}>
          Encuentra información de diferentes medios en un solo lugar.
        </p>
      </div>

      {/* Buscador */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group input-group-lg">
          <span className="input-group-text bg-transparent">
            <i className="bi bi-search"></i>
          </span>

          <input
            type="search"
            className="form-control"
            placeholder="Buscar noticias, temas o palabras clave..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Buscar noticias"
          />

          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </div>
      </form>

      {/* Búsquedas recientes */}
      {recentSearches.length > 0 && (
        <section className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h2 className="h6 fw-bold mb-0">
              <i className="bi bi-clock-history me-2"></i>
              Búsquedas recientes
            </h2>
          </div>

          <div className="d-flex flex-wrap gap-2">
            {recentSearches.map((query) => (
              <button
                key={query}
                type="button"
                className="btn btn-sm rounded-pill"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  color: "var(--text-body)",
                  border: "1px solid var(--border-color)",
                }}
                onClick={() => selectRecentSearch(query)}
              >
                {query}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Filtro por categorías */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-label mb-0">Secciones temáticas</h2>

        <button
          className="clear-filters border-0 bg-transparent"
          onClick={clearFilters}
        >
          Limpiar filtros
        </button>
      </div>

      <div className="category-pills d-flex flex-nowrap overflow-auto gap-2 pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-pill ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtros secundarios */}
      <section className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <label className="form-label small fw-semibold">Rango temporal</label>

          <select
            className="form-select"
            value={timeRange}
            onChange={(event) => setTimeRange(event.target.value)}
            style={{
              backgroundColor: "var(--bg-card)",
              color: "var(--text-body)",
              borderColor: "var(--border-color)",
            }}
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label small fw-semibold">Medio emisor</label>

          <select
            className="form-select"
            value={activeSource}
            onChange={(event) => setActiveSource(event.target.value)}
            style={{
              backgroundColor: "var(--bg-card)",
              color: "var(--text-body)",
              borderColor: "var(--border-color)",
            }}
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Resultados */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5 results-heading mb-0">Resultados</h2>

          <span className="results-count">
            {filteredNews.length} noticias encontradas
          </span>
        </div>

        {filteredNews.length > 0 ? (
          <div className="row g-4">
            {filteredNews.map((news) => (
              <div className="col-12 col-md-6" key={news.id}>
                <TarjetaNoticiaImagen
                  news={news}
                  onGuardar={alternarGuardado}
                  onLectura={setNoticiaSeleccionada}
                  guardada={estaGuardada(news)}
                  
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-5 rounded-4"
            style={{
              backgroundColor: "var(--bg-subtle)",
              color: "var(--text-muted)",
            }}
          >
            <i className="bi bi-search display-5 mb-3 d-block"></i>

            <h3 className="h5 fw-bold">No encontramos noticias</h3>

            <p className="mb-3">
              Prueba con otras palabras o modifica los filtros.
            </p>

            <button
              className="btn btn-outline-primary rounded-pill"
              onClick={clearFilters}
            >
              Limpiar búsqueda y filtros
            </button>
          </div>
        )}
      </section>
      <ModalNoticia
        noticia={noticiaSeleccionada}
        onCerrar={() => setNoticiaSeleccionada(null)}
        onGuardar={alternarGuardado}
        guardada={
          noticiaSeleccionada ? estaGuardada(noticiaSeleccionada) : false
        }
      />
    </main>
  );
}

export default SearchPage;
