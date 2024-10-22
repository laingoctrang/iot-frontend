import { NgStyle, CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ElementRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Chart } from 'chart.js';


import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { NgApexchartsModule } from 'ng-apexcharts';

import { NgToggleModule } from 'ng-toggle-button';

import { lineChart, updateLineChart } from './dashboard-line-chart';
import { temperatureGauge, humidityGauge, lightGauge } from './dashboard-gauge';

import { DashboardService } from '../../services/dashboard.service';
import { HttpClient } from '@angular/common/http';



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    TextColorDirective,
    MatCardModule,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    IconDirective,
    ReactiveFormsModule,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    ChartjsComponent,
    NgStyle,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    CardHeaderComponent,
    TableDirective,
    AvatarComponent,
    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatListModule,
    NgApexchartsModule,
    CommonModule,
    NgToggleModule
  ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public temperatureGauge = temperatureGauge;
  public humidityGauge = humidityGauge;
  public lightGauge = lightGauge;

  public currentDate = new Date();

  public lineChart!: Chart;

  minMaxDataSensors = {
    maxTemperature: "0",
    minTemperature: "0",
    maxHumidity: "0",
    minHumidity: "0",
    maxLight: "0",
    minLight: "0"
  };

  constructor(
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit(): void {
    this.getMinMaxDataSensors();
    this.fanOn = JSON.parse(sessionStorage.getItem('fanOn') || 'false');
    this.acOn = JSON.parse(sessionStorage.getItem('acOn') || 'false');
    this.bulbOn = JSON.parse(sessionStorage.getItem('bulbOn') || 'false');
  }

  getMinMaxDataSensors(): void {
    this.dashboardService.getMinMaxDataSenSors().subscribe(
      data => {
        if (data !== null) {
          this.minMaxDataSensors = data;
        }
      },
      error => {
        console.error('Có lỗi khi gọi API:', error);
      }
    );
  }

  loadData(): void {
    this.dashboardService.getLatestDataSensors().subscribe((data) => {
      this.temperatureGauge.series = [this.convertTemperatureData(data.temperature)];
      this.humidityGauge.series = [data.humidity];
      this.lightGauge.series = [this.convertLightData(data.light)];
    });

    this.dashboardService.getRecentDataSensors().subscribe((data) => {
      const temperatureData: number[] = data.map((item) => item.temperature);
      const humidityData: number[] = data.map((item) => item.humidity);
      const lightData: number[] = data.map((item) => item.light);
      const timeData: string[] = data.map((item) => this.formatDate(item.time));

      this.lineChart.data.datasets[0].data = temperatureData;
      this.lineChart.data.datasets[1].data = humidityData;
      this.lineChart.data.datasets[2].data = lightData;
      this.lineChart.data.labels = timeData;

    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  convertTemperatureData(value: number): number {
    const oldMin = 0;
    const oldMax = 50;
    const newMin = 0;
    const newMax = 100;
    return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
  }

  convertLightData(value: number): number {
    const oldMin = 0;
    const oldMax = 10000;
    const newMin = 0;
    const newMax = 100;
    return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
  }

  ngAfterViewInit(): void {
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (context) {
      this.lineChart = lineChart(context);
    }

    this.loadData();

    window.setInterval(() => {
      this.dashboardService.getLatestDataSensors().subscribe((data) => {
        const newTemperature = data.temperature;
        const newHumidity = data.humidity;
        const newLight = data.light;
        const newTime = this.formatDate(data.time);

        temperatureGauge.series = [this.convertTemperatureData(newTemperature)];
        humidityGauge.series = [newHumidity];
        lightGauge.series = [this.convertLightData(newLight)];

        updateLineChart(this.lineChart, newTime, newTemperature, newHumidity, newLight);
      });

      this.getMinMaxDataSensors();
    }, 5000);
  }

  // Toggle 
  fanOn: boolean = false;
  acOn: boolean = false;
  bulbOn: boolean = false;

  isProcessingFan: boolean = false;
  isProcessingAc: boolean = false;
  isProcessingBulb: boolean = false;

  hasErrorFan = false;
  hasErrorAc = false;
  hasErrorBulb = false;

  toggleDevice(device: string, event: Event) {
    event.preventDefault();
  
    let status!: boolean;
  
    if (device === 'fan') {
      status = !this.fanOn;
      this.isProcessingFan = true;
      this.hasErrorFan = false;
    } else if (device === 'ac') {
      status = !this.acOn;
      this.isProcessingAc = true;
      this.hasErrorAc = false;
    } else if (device === 'bulb') {
      status = !this.bulbOn;
      this.isProcessingBulb = true;
      this.hasErrorBulb = false;
    }
  
    console.log(`Processing request to toggle ${device}...`);
  
    const timeout = setTimeout(() => {
      console.error("Request timed out. Please try again.");
      this.resetProcessingState(device);  // Kết thúc trạng thái xử lý
    }, 15000);
  
    this.dashboardService.controlDevice(device, status).subscribe(
      (response: any) => {
        clearTimeout(timeout);  // Xóa timeout khi có phản hồi từ server
        if (response.status === "success") {
          // Nếu thành công, cập nhật trạng thái thiết bị
          if (device === 'fan') {
            this.fanOn = status;
            this.hasErrorFan = false;
          } else if (device === 'ac') {
            this.acOn = status;
            this.hasErrorAc = false;
          } else if (device === 'bulb') {
            this.bulbOn = status;
            this.hasErrorBulb = false;
          }

          // Lưu trạng thái vào sessionStorage
          this.saveStateToSessionStorage();

          console.log(`${response.message}`);
        } else {
          console.error(`Failed response: ${response.message}`);
          if (device === 'fan') {
            this.hasErrorFan = true;
          } else if (device === 'ac') {
            this.hasErrorAc = true;
          } else if (device === 'bulb') {
            this.hasErrorBulb = true;
          }
        }
        this.resetProcessingState(device);  // Kết thúc trạng thái xử lý
      },
      error => {
        clearTimeout(timeout);  // Xóa timeout khi có lỗi
        console.error(`Error controlling ${device}:`, error);
        this.resetProcessingState(device);  // Kết thúc trạng thái xử lý
        if (device === 'fan') {
          this.hasErrorFan = true;
        } else if (device === 'ac') {
          this.hasErrorAc = true;
        } else if (device === 'bulb') {
          this.hasErrorBulb = true;
        }
      }
    ); 
  }
  
  resetProcessingState(device: string) {
    if (device === 'fan') {
      this.isProcessingFan = false;
    } else if (device === 'ac') {
      this.isProcessingAc = false;
    } else if (device === 'bulb') {
      this.isProcessingBulb = false;
    }
  }

  // lưu trạng thái toggle
  saveStateToSessionStorage() {
    sessionStorage.setItem('fanOn', JSON.stringify(this.fanOn));
    sessionStorage.setItem('acOn', JSON.stringify(this.acOn));
    sessionStorage.setItem('bulbOn', JSON.stringify(this.bulbOn));
  }
}