import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

export const temperatureGauge: Partial<ChartOptions> = {
  series: [0],
  chart: {
    type: "radialBar",
    offsetY: -30,
    height: 550,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: "97%",
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: true,
          offsetY: 0,
          fontSize: "35px",
          fontWeight: 500,
          fontFamily: 'Lexend Deca, Helvetica, Arial, sans-serif',
          formatter: function (val) {
            const oldMin = 0;      // Giá trị nhỏ nhất trong khoảng đầu vào
            const oldMax = 100;    // Giá trị lớn nhất trong khoảng đầu vào
            const newMin = 0;      // Giá trị nhỏ nhất trong khoảng đầu ra
            const newMax = 50;     // Giá trị lớn nhất trong khoảng đầu ra

            return ((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin + "";
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          color: '#FFE3B1',
          opacity: 1
        },
        {
          offset: 100,
          color: '#FFA497',
          opacity: 1
        }
      ]
    }
  },
  labels: ["Temperature Gauge"]
};

export const humidityGauge: Partial<ChartOptions> = {
  series: [0],
  chart: {
    type: "radialBar",
    offsetY: -30,
    height: 550,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: "97%",
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: 0,
          fontSize: "35px",
          fontWeight: 500,
          fontFamily: 'Lexend Deca, Helvetica, Arial, sans-serif',
          formatter: function (val) {
            return val + "";
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          color: '#FDD6EE',
          opacity: 1
        },
        {
          offset: 100,
          color: '#79B1ED',
          opacity: 1
        }
      ]
    }
  },
  labels: ['Humidity Gauge']
};

export const lightGauge: Partial<ChartOptions> = {
  series: [0],
  chart: {
    type: "radialBar",
    offsetY: -30,
    height: 550,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: "97%",
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: 0,
          fontSize: "35px",
          fontWeight: 500,
          fontFamily: 'Lexend Deca, Helvetica, Arial, sans-serif',
          formatter: function (val: number) {
            const oldMin = 0;      // Giá trị nhỏ nhất trong khoảng đầu vào
            const oldMax = 100;    // Giá trị lớn nhất trong khoảng đầu vào
            const newMin = 0;      // Giá trị nhỏ nhất trong khoảng đầu ra
            const newMax = 10000;   // Giá trị lớn nhất trong khoảng đầu ra

            const result = ((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;

            return Math.ceil(result) + "";
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          color: '#FBF2B3',
          opacity: 1
        },
        {
          offset: 100,
          color: '#9ADBBD',
          opacity: 1
        }
      ]
    }
  },
  labels: ["Light Gauge"]
};


export const dustGauge: Partial<ChartOptions> = {
  series: [0],
  chart: {
    type: "radialBar",
    offsetY: -30,
    height: 550,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: "97%",
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: 0,
          fontSize: "35px",
          fontWeight: 500,
          fontFamily: 'Lexend Deca, Helvetica, Arial, sans-serif',
          formatter: function (val) {
            return val + "";
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          color: '#DFF2EB', // Màu tím nhạt
          opacity: 1
        },
        {
          offset: 100,
          color: '#7AB2D3', // Màu cam nâu nhạt
          opacity: 1
        }
      ]
    }
  },
  labels: ['Dust Gauge']
};

