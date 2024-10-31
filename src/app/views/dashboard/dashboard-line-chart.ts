
import { AnimationSpec, Chart, ChartOptions, ChartType } from 'chart.js';


const lineChartOptions: ChartOptions = {
  plugins: {
    legend: {
      labels: {
        font: {
          family: 'Lexend Deca',
          size: 12,
          weight: 300,        // Đặt font-weight là 300 cho legend
        }
      }
    }
  },
  scales: {
    'y-axis-temp-hum': {
      type: 'linear',
      position: 'left',
      title: {
        display: true,
        padding: 15,
        text: 'Temperature & Humidity',
        // text: 'Temperature, Humidity, Dust',
        font: {
          family: 'Lexend Deca',
          size: 14,
          weight: 300,
        }
      },
      min: 0,
      max: 100,
      ticks: {
        font: {
          family: 'Lexend Deca',
          size: 12,
          weight: 300,
        }
      }
    },
    'y-axis-light': {
      type: 'linear',
      position: 'right',
      title: {
        display: true,
        padding: 15,
        text: 'Light Intensity',
        font: {
          family: 'Lexend Deca',
          size: 14,
          weight: 300,
        }
      },
      ticks: {
        font: {
          family: 'Lexend Deca',
          size: 12,
          weight: 300,
        }
      },
      grid: {
        drawOnChartArea: false,
      },
    },
    x: {
      title: {
        display: true,
        text: 'Time',
        font: {
          family: 'Lexend Deca',
          size: 14,
          weight: 300,
        }
      },
      ticks: {
        maxRotation: 45,
        minRotation: 45,
        font: {
          family: 'Lexend Deca',
          size: 12,
          weight: 300,
        }
      },
    }
  },
};

export const lineChart = (context: CanvasRenderingContext2D): Chart => {
  return new Chart(context, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Temperature',
          data: [],
          yAxisID: 'y-axis-temp-hum',
          borderColor: 'rgb(255, 139, 106)',
          backgroundColor: 'rgba(255, 139, 106,0.2)',
        },
        {
          label: 'Humidity',
          data: [],
          yAxisID: 'y-axis-temp-hum',
          borderColor: 'rgba(54,162,235,1)',
          backgroundColor: 'rgba(54,162,235,0.2)',
        },
        {
          label: 'Light',
          data: [],
          yAxisID: 'y-axis-light',
          borderColor: 'rgb(109, 201, 141)',
          backgroundColor: 'rgba(109, 201, 141,0.2)',
        },
        // {
        //   label: 'Dust',
        //   data: [],
        //   yAxisID: 'y-axis-temp-hum',
        //   borderColor: 'rgb(255, 139, 106)',
        //   backgroundColor: 'rgba(255, 139, 106,0.2)',
        // },
      ]
    },
    options: {
      ...lineChartOptions,
      responsive: true, // Đảm bảo biểu đồ phản hồi theo kích thước khung
      maintainAspectRatio: false, // Cho phép điều chỉnh tỷ lệ
    }
  });
}

export function updateLineChart(chart: Chart, newLabel: string, newTemperature: number, newHumidity: number, newLight: number) {
  if (!chart.data.labels) {
    chart.data.labels = [];
  }

  // Đẩy nhãn mới vào mảng labels và xóa nhãn cũ nhất nếu quá giới hạn
  chart.data.labels.push(newLabel);
  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
  }

  // Đảm bảo datasets[0].data được khởi tạo cho Temperature
  if (!chart.data.datasets[0].data) {
    chart.data.datasets[0].data = [];
  }
  chart.data.datasets[0].data.push(newTemperature);
  if (chart.data.datasets[0].data.length > 20) {
    chart.data.datasets[0].data.shift();
  }

  // Đảm bảo datasets[1].data được khởi tạo cho Humidity
  if (!chart.data.datasets[1].data) {
    chart.data.datasets[1].data = [];
  }
  chart.data.datasets[1].data.push(newHumidity);
  if (chart.data.datasets[1].data.length > 20) {
    chart.data.datasets[1].data.shift();
  }

  // Đảm bảo datasets[2].data được khởi tạo cho Light
  if (!chart.data.datasets[2].data) {
    chart.data.datasets[2].data = [];
  }
  chart.data.datasets[2].data.push(newLight);
  if (chart.data.datasets[2].data.length > 20) {
    chart.data.datasets[2].data.shift();
  }

  // Cập nhật lại biểu đồ
  chart.update();
}

// export function updateLineChart(chart: Chart, newLabel: string, newTemperature: number, newHumidity: number, newLight: number, newDust) {
//   if (!chart.data.labels) {
//     chart.data.labels = [];
//   }

//   // Đẩy nhãn mới vào mảng labels và xóa nhãn cũ nhất nếu quá giới hạn
//   chart.data.labels.push(newLabel);
//   if (chart.data.labels.length > 20) {
//     chart.data.labels.shift();
//   }

//   // Đảm bảo datasets[0].data được khởi tạo cho Temperature
//   if (!chart.data.datasets[0].data) {
//     chart.data.datasets[0].data = [];
//   }
//   chart.data.datasets[0].data.push(newTemperature);
//   if (chart.data.datasets[0].data.length > 20) {
//     chart.data.datasets[0].data.shift();
//   }

//   // Đảm bảo datasets[1].data được khởi tạo cho Humidity
//   if (!chart.data.datasets[1].data) {
//     chart.data.datasets[1].data = [];
//   }
//   chart.data.datasets[1].data.push(newHumidity);
//   if (chart.data.datasets[1].data.length > 20) {
//     chart.data.datasets[1].data.shift();
//   }

//   // Đảm bảo datasets[2].data được khởi tạo cho Light
//   if (!chart.data.datasets[2].data) {
//     chart.data.datasets[2].data = [];
//   }
//   chart.data.datasets[2].data.push(newLight);
//   if (chart.data.datasets[2].data.length > 20) {
//     chart.data.datasets[2].data.shift();
//   }

//   //
//   if (!chart.data.datasets[3].data) {
//     chart.data.datasets[3].data = [];
//   }
//   chart.data.datasets[3].data.push(newDust);
//   if (chart.data.datasets[3].data.length > 20) {
//     chart.data.datasets[3].data.shift();
//   }

//   // Cập nhật lại biểu đồ
//   chart.update();
// }
