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

import { lineChart, updateLineChart } from './dashboard2-line-chart';
import { temperatureGauge, humidityGauge, lightGauge, dustGauge } from './dashboard2-gauge';

import { DashboardService } from '../../services/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';



@Component({
  templateUrl: 'dashboard2.component.html',
  styleUrls: ['dashboard2.component.scss'],
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
export class Dashboard2Component implements OnInit, AfterViewInit {
  public dustGauge = dustGauge;

  public currentDate = new Date();

  public lineChart1!: Chart;

  public count: number = 0;

  minMaxDataSensors = {
    maxTemperature: "0",
    minTemperature: "0",
    maxHumidity: "0",
    minHumidity: "0",
    maxLight: "0",
    minLight: "0",
    maxDust: "0",
    minDust: "0"
  };

  constructor(
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
    this.getMinMaxDataSensors();
    this.apOn = JSON.parse(sessionStorage.getItem('apOn') || 'false');
    this.dashboardService.getDustCount().subscribe(
      (data: number) => {
        this.count = data; // Lưu kết quả vào biến `count`
      },
      (error) => {
        console.error('Error fetching dust count', error);
      }
    );
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
      this.dustGauge.series = [data.dust];
    });

    this.dashboardService.getRecentDataSensors().subscribe((data) => {
      const dustData: number[] = data.map((item) => item.dust);
      const timeData: string[] = data.map((item) => this.formatDate(item.time));

      this.lineChart1.data.datasets[0].data = dustData;
      this.lineChart1.data.labels = timeData;

      this.lineChart1.update();

    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }


  ngAfterViewInit(): void {
    const canvas = document.getElementById('lineChart1') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (context) {
      this.lineChart1 = lineChart(context);
    }

    this.loadData();

    window.setInterval(() => {
      this.dashboardService.getLatestDataSensors().subscribe((data) => {
        const newDust = data.dust;

        if (newDust > 70) {
          this.isDustHigh = true;
          this.isProcessingAp = true;
          this.autoToggleSwitch(); 
        }

        dustGauge.series = [newDust];

        const newTime = this.formatDate(data.time);
        updateLineChart(this.lineChart1, newDust, newTime);
        this.lineChart1.update();

        
      });

      this.dashboardService.getDustCount().subscribe(
        (data: number) => {
          this.count = data; // Lưu kết quả vào biến `count`
        },
        (error) => {
          console.error('Error fetching dust count', error);
        }
      );

      // if (this.isDustHigh && this.apOn) {
      //   this.apOn = false;
      // }

      this.isDustHigh = false;
      this.isProcessingAp = false;

    

    }, 3000);
  }

  autoToggleSwitch(): void {
    let toggleCount = 0; // Khởi tạo biến đếm
  
    const toggleInterval = setInterval(() => {
      if (toggleCount >= 10) {
        clearInterval(toggleInterval); // Dừng khi `isDustHigh` là false hoặc đã gạt 10 lần
        return;
      }
  
      this.apOn = !this.apOn; // Đổi trạng thái công tắc
      toggleCount++; // Tăng biến đếm mỗi lần gạt
  
    }, 250); // Tốc độ gạt bật/tắt (250ms)
  }

  // Toggle 
  apOn: boolean = false;
  isProcessingAp: boolean = false;
  hasErrorAp = false;
  isDustHigh = false;

  toggleDevice(device: string, event: Event) {
    event.preventDefault();
  
    let status!: boolean;
  
    if (device === 'ap') {
      status = !this.apOn;
      this.isProcessingAp = true;
      this.hasErrorAp = false;
    }
  
    console.log(`Processing request to toggle ${device}...`);
  
    const timeout = setTimeout(() => {
      console.error("Request timed out. Please try again.");
      this.isProcessingAp = false;  // Kết thúc trạng thái xử lý
    }, 10000);
  
    this.dashboardService.controlDevice(device, status).subscribe(
      (response: any) => {
        clearTimeout(timeout);  // Xóa timeout khi có phản hồi từ server
        if (response.status === "success") {
          this.apOn = status;
          this.hasErrorAp = false;

          this.saveStateToSessionStorage();

          console.log(`${response.message}`);
        } else {
          console.error(`Failed response: ${response.message}`);
            this.hasErrorAp = true;
        }
        this.isProcessingAp = false;  // Kết thúc trạng thái xử lý
      },
      error => {
        clearTimeout(timeout);  // Xóa timeout khi có lỗi
        console.error(`Error controlling ${device}:`, error);
        this.isProcessingAp = false;  // Kết thúc trạng thái xử lý
        this.hasErrorAp = true;
      }
    ); 
  }

  // lưu trạng thái toggle
  saveStateToSessionStorage() {
    sessionStorage.setItem('apOn', JSON.stringify(this.apOn));
  }
}