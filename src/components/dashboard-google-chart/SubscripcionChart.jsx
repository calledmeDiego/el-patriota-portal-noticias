import GoogleChart from "./GoogleChart";

function SubscripcionChart() {
  const data = [
    ["Semana", "Suscriptores"],
    ["Semana 1", 85],
    ["Semana 2", 110],
    ["Semana 3", 132],
    ["Semana 4", 185],
  ];

  return (
    <article className="dashboard-chart-card">
      <h3 className="dashboard-chart-title">Suscripciones al boletín</h3>
      <p className="dashboard-chart-description">
        Nuevos suscriptores durante las últimas 4 semanas.
      </p>

      <div className="dashboard-chart-container">
        <GoogleChart type="ColumnChart" data={data} />
      </div>
    </article>
  );
}

export default SubscripcionChart;
