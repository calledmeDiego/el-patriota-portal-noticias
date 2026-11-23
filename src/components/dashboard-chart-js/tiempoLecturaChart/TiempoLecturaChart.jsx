import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getChartOptions } from "../../../js/configurarCharts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function TiempoLecturaChart() {
  const data = {
    labels: ["Política", "Economía", "Deportes", "Tecnología", "Cultura"],
    datasets: [
      {
        label: "Minutos promedio",
        data: [3.5, 4.2, 2.8, 5.1, 3.9],
        backgroundColor: "#8A2624",
        fill: true,
      },
    ],
  };

  return (
    <article className="dashboard-chart-card">
      <h3 className="dashboard-chart-title">Tiempo promedio de lectura</h3>
      <p className="dashboard-chart-description">
        Tiempo dedicado a leer noticias según la sección.
      </p>
      <div className="dashboard-chart-container">
        <Bar data={data} options={getChartOptions()} />
      </div>
    </article>
  );
}

export default TiempoLecturaChart;
