
export function getChartOptions(showScales = true) {
  return {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#474540',
          usePointStyle: true,
          padding: 20
        }
      },

      tooltip: {
        backgroundColor: '#222220',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        padding: 12
      }
    },

    ...(showScales && {
      scales: {
        x: {
          ticks: {
            color: '#73716A'
          },
          grid: {
            color: '#E2DFD6'
          }
        },

        y: {
          beginAtZero: true,
          ticks: {
            color: '#73716A'
          },
          grid: {
            color: '#E2DFD6'
          }
        }
      }
    })
  };
}
