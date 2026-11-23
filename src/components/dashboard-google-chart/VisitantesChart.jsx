import GoogleChart from "./GoogleChart";
import { defaultChartOptions } from "./chartOptions";

function VisitantesChart() {
  const data = [
    ["Día", "Visitantes únicos"],
    ["Lun", 4200],
    ["Mar", 4800],
    ["Mié", 3900],
    ["Jue", 5500],
    ["Vie", 5100],
    ["Sáb", 6200],
    ["Dom", 4590],
  ];

  return (
    <article className="dashboard-chart-card">
      <h3 className="dashboard-chart-title">Evolución de visitantes únicos</h3>

      <p className="dashboard-chart-description">
        Cantidad de visitantes durante los últimos 7 días.
      </p>

      <div className="dashboard-chart-container">
        <GoogleChart
          type="LineChart"
          data={data}
          options={defaultChartOptions}
        />
      </div>
    </article>
  );
}

export default VisitantesChart;
