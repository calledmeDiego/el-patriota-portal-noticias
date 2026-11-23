import GoogleChart from "./GoogleChart";

function TraficoChart() {
  const data = [
    ["Fuente", "Visitantes"],
    ["Búsqueda orgánica", 42],
    ["Directo", 25],
    ["Redes sociales", 20],
    ["Referencias", 8],
    ["Otros", 5],
  ];

  return (
    <article className="dashboard-chart-card">
      <h3 className="dashboard-chart-title">Fuentes de tráfico</h3>
      <p className="dashboard-chart-description">
        Distribución de visitantes según su canal de adquisición.
      </p>

      <div className="dashboard-chart-container">
        <GoogleChart type="PieChart" data={data} options={{ pieHole: 0.55 }} />
      </div>
    </article>
  );
}

export default TraficoChart;
