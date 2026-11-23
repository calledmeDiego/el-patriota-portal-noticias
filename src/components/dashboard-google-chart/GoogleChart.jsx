
import { useEffect, useRef } from 'react';

let googleChartsPromise;

function loadGoogleCharts() {
  if (window.google?.visualization) {
    return Promise.resolve(window.google);
  }

  if (!googleChartsPromise) {
    googleChartsPromise = new Promise((resolve, reject) => {
      if (!window.google?.charts) {
        reject(new Error('Google Charts no está cargado. Revisa index.html.'));
        return;
      }

      window.google.charts.load('current', {
        packages: ['corechart']
      });

      window.google.charts.setOnLoadCallback(() => {
        resolve(window.google);
      });
    });
  }

  return googleChartsPromise;
}

function GoogleChart({ type, data, options = {} }) {
  const chartRef = useRef(null);

  useEffect(() => {
    let chart;
    let isMounted = true;

    const drawChart = async () => {
      try {
        const google = await loadGoogleCharts();

        if (!isMounted || !chartRef.current) return;

        const chartData = google.visualization.arrayToDataTable(data);
        const ChartClass = google.visualization[type];

        chart = new ChartClass(chartRef.current);
        chart.draw(chartData, options);
      } catch (error) {
        console.error('Error al cargar Google Charts:', error);
      }
    };

    drawChart();

    return () => {
      isMounted = false;
    };
  }, [type, data, options]);

  return <div ref={chartRef} />;
}

export default GoogleChart;
