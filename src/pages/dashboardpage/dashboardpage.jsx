import { useState } from "react";

import VisitantesChart from "../../components/dashboard-google-chart/VisitantesChart";
import ConversionChart from "../../components/dashboard-google-chart/ConversionChart";
import SubscripcionChart from "../../components/dashboard-google-chart/SubscripcionChart";
import TraficoChart from "../../components/dashboard-google-chart/TraficoChart";

import NoticiasGuardadasChart from "../../components/dashboard-chart-js/noticiasGuardadasChart/NoticiasGuardadasChart";
import NoticiasPublicadasChart from "../../components/dashboard-chart-js/noticiasPublicadasChart/NoticiasPublicadasChart";
import TiempoLecturaChart from "../../components/dashboard-chart-js/tiempoLecturaChart/TiempoLecturaChart";
import VisitasChart from "../../components/dashboard-chart-js/visitasChart/VisitasChart";

import "./dashboardpage.css";

function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const audienceIndicators = [
    {
      title: "Visitantes únicos",
      value: "34,290",
      detail: "Audiencia total",
      icon: "bi bi-people",
    },
    {
      title: "Usuarios registrados",
      value: "1,208",
      detail: "Cuentas creadas",
      icon: "bi bi-person-check",
    },
    {
      title: "Suscriptores al boletín",
      value: "512",
      detail: "Suscripciones",
      icon: "bi bi-envelope",
    },
    {
      title: "Tasa de conversión",
      value: "3.52%",
      detail: "Visitantes registrados",
      icon: "bi bi-graph-up-arrow",
    },
  ];
  const indicators = [
    {
      title: "Visitas totales",
      value: "14,880",
      detail: "Últimos 7 días",
      icon: "bi bi-eye",
    },
    {
      title: "Noticias publicadas",
      value: "87",
      detail: "Total de publicaciones",
      icon: "bi bi-newspaper",
    },
    {
      title: "Tiempo promedio",
      value: "3.9 min",
      detail: "Por lectura",
      icon: "bi bi-clock",
    },
    {
      title: "Noticias guardadas",
      value: "190",
      detail: "Por los usuarios",
      icon: "bi bi-bookmark",
    },
  ];

  return (
    <main className="container-fluid py-4 dashboard-content">
      {currentPage === 1 ? (
        <>
          <header className="mb-4 dashboard-header">
            <div>
              <p className="dashboard-eyebrow">
                Panel de administración / Contenido
              </p>

              <h1 className="dashboard-title">Rendimiento editorial</h1>

              <p className="dashboard-description">
                Estadísticas generales sobre el rendimiento y consumo de
                noticias de El Patriota.
              </p>
            </div>
          </header>
          <section>
            <div className="row g-3">
              {indicators.map((item) => (
                <div className="col-6 col-xl-3" key={item.title}>
                  <article className="dashboard-kpi">
                    <span className="dashboard-kpi-label">
                      <i className={`${item.icon} me-2`}></i>
                      {item.title}
                    </span>

                    <strong className="dashboard-kpi-value">
                      {item.value}
                    </strong>

                    <span className="dashboard-kpi-detail">{item.detail}</span>
                  </article>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="dashboard-section-title">Análisis de contenido</h2>

            <div className="row g-4">
              <div className="col-12 col-xl-6">
                <VisitasChart />
              </div>

              <div className="col-12 col-xl-6">
                <NoticiasPublicadasChart />
              </div>

              <div className="col-12 col-xl-6">
                <TiempoLecturaChart />
              </div>

              <div className="col-12 col-xl-6">
                <NoticiasGuardadasChart />
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <header className="mb-4 dashboard-header">
            <div>
              <p className="dashboard-eyebrow">
                Panel de administración / Audiencia
              </p>

              <h1 className="dashboard-title">Audiencia y marketing</h1>

              <p className="dashboard-description">
                Estadísticas de visitantes, registros y suscripciones de El
                Patriota.
              </p>
            </div>
          </header>

          <section>
            <div className="row g-3">
              {audienceIndicators.map((item) => (
                <div className="col-6 col-xl-3" key={item.title}>
                  <article className="dashboard-kpi">
                    <span className="dashboard-kpi-label">
                      <i className={`${item.icon} me-2`}></i>
                      {item.title}
                    </span>

                    <strong className="dashboard-kpi-value">
                      {item.value}
                    </strong>

                    <span className="dashboard-kpi-detail">{item.detail}</span>
                  </article>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="dashboard-section-title">Análisis de audiencia</h2>

            <div className="row g-4">
              <div className="col-12 col-xl-6">
                <VisitantesChart />
              </div>

              <div className="col-12 col-xl-6">
                <TraficoChart />
              </div>

              <div className="col-12 col-xl-6">
                <ConversionChart />
              </div>

              <div className="col-12 col-xl-6">
                <SubscripcionChart />
              </div>
            </div>
          </section>
        </>
      )}

      <nav aria-label="Navegación de dashboards" className="mt-5">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
          </li>

          {[1, 2].map((page) => (
            <li
              className={`page-item ${currentPage === page ? "active" : ""}`}
              key={page}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === 2 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(2)}
              disabled={currentPage === 2}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
}

export default DashboardPage;
