
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
        // text: 'Temperature & Humidity',
        text: 'Dust',
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
    x: {
      title: {
        display: false,
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
          label: 'Dust',
          data: [],
          yAxisID: 'y-axis-temp-hum',
          borderColor: 'rgb(122, 178, 211)',
          backgroundColor: 'rgb(122, 178, 211, 0.2)',
        },
      ]
    },
    options: {
      ...lineChartOptions,
      responsive: true, // Đảm bảo biểu đồ phản hồi theo kích thước khung
      maintainAspectRatio: false, // Cho phép điều chỉnh tỷ lệ
    }
  });
}

export function updateLineChart(chart: Chart, newDust: number, newLabel: string) {
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
  chart.data.datasets[0].data.push(newDust);
  if (chart.data.datasets[0].data.length > 20) {
    chart.data.datasets[0].data.shift();
  }

  // Cập nhật lại biểu đồ
  chart.update();
}
