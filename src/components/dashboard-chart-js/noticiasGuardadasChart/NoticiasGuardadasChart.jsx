import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import './noticiasguardadaschart.css'
ChartJS.register(ArcElement, Tooltip, Legend);

function NoticiasGuardadasChart() {
  const data = {
    labels: ["Política", "Economía", "Deportes", "Tecnología", "Cultura"],
    datasets: [
      {
        label: "Noticias guardadas",
        data: [45, 30, 60, 35, 20],
        backgroundColor: [
          '#8A2624',
          '#C69A45',
          '#385A48',
          '#547A9E',
          '#9B7894'
        ],

        borderColor: '#FFFFFF',
        borderWidth: 3,
        hoverOffset: 8
      },
    ],
  };

  return (
    <article className="dashboard-chart-card">
      <h3 className="dashboard-chart-title">
        Noticias guardadas por los usuarios
      </h3>
      <p className="dashboard-chart-description">
        Distribución de artículos guardados por sección.
      </p>
      <div className="dashboard-chart-container saved-news-chart">
        <Doughnut data={data} />
      </div>
    </article>
  );
}

export default NoticiasGuardadasChart;
