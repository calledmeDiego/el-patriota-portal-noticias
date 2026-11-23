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

function NoticiasPublicadasChart() {
  const data = {
    labels: [
      "Política",
      "Economía",
      "Deportes",
      "Tecnología",
      "Cultura",
      "Mundo",
    ],
    datasets: [
      {
        label: "Noticias publicadas",
        data: [18, 12, 24, 10, 8, 15],
        backgroundColor: [
          "#8A2624", // Política - Rojo editorial
          "#C69A45", // Economía - Dorado
          "#385A48", // Deportes - Verde
          "#547A9E", // Tecnología - Azul
          "#9B7894", // Cultura - Malva
          "#73716A", // Mundo - Gris
        ],

        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  return (
    <article className="dashboard-chart-card">
      <h3 className="dashboard-chart-title">Noticias publicadas</h3>
      <p className="dashboard-chart-description">
        Cantidad de noticias publicadas por sección.
      </p>
      <div className="dashboard-chart-container">
        <Bar data={data} options={getChartOptions()} />
      </div>
    </article>
  );
}

export default NoticiasPublicadasChart;
