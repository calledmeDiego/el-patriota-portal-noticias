import GoogleChart from "./GoogleChart";

function ConversionChart() {
  const data = [
    ["Etapa", "Usuarios"],
    ["Visitantes únicos", 34290],
    ["Usuarios registrados", 1208],
    ["Suscriptores", 512],
  ];

  return (
    <article className="dashboard-chart-card">
      <h3 className="dashboard-chart-title">Embudo de conversión</h3>
      <p className="dashboard-chart-description">
        Comparación de usuarios en cada etapa de conversión.
      </p>

      <div className="dashboard-chart-container">
        <GoogleChart type="BarChart" data={data} />
      </div>
    </article>
  );
}

export default ConversionChart;
