import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getChartOptions } from "../../../js/configurarCharts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function VisitasChart() {
  const data = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [
      {
        label: "Visitas",
        data: [1250, 1890, 1540, 2300, 1950, 2800, 3150],
        borderColor: "#8A2624",
        backgroundColor: "rgba(138, 38, 36, 0.12)",
        borderWidth: 2,
        pointBackgroundColor: "#8A2624",
        pointBorderColor: "#FFFFFF",
        pointRadius: 4,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <article className="dashboard-chart-card">
      <h3 className="dashboard-chart-title">Visitas totales a noticias</h3>

      <p className="dashboard-chart-description">
        Evolución de las visitas durante los últimos 7 días.
      </p>

      <div className="dashboard-chart-container">
        <Line data={data} options={getChartOptions()} />
      </div>
    </article>
  );
}

export default VisitasChart;
