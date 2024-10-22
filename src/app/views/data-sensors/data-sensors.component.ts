import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DataSensorsService } from '../../services/data-sensors.service'
import { HttpParams } from '@angular/common/http';
import { NgbPopoverModule, NgbCollapseModule, NgbDatepickerModule, NgbDateStruct, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TimepickerModule, TimepickerConfig  } from 'ngx-bootstrap/timepicker';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'data-sensors',
  styleUrls: ['./data-sensors.component.scss'],
  templateUrl: './data-sensors.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],
  imports: [
    MatCardModule,
    FormsModule,
    CommonModule,
    NgbPopoverModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    TimepickerModule,
  ],
}) 
export class DataSensorsComponent implements OnInit {

  dataSource: DataSensorsElement[] = [];

  pageNumber: number = 1; // Chỉ số trang bắt đầu từ 1
  pageSize: number = 10; // Kích thước trang mặc định
  collectionSize: number = 0; // Tổng số bản ghi

  sortColumn: string = ''; // Theo dõi cột hiện tại đang được sắp xếp
  sortDirection: 'asc' | 'desc' | 'none' = 'none'; // Theo dõi hướng sắp xếp

  searchTemperature: number | null = null;
  searchHumidity: number | null = null;
  searchLight: number | null = null;
  date!: NgbDateStruct;
  time!: string;

  dateString: string = '';
  timeString: string = '';
  datetimeString: string = '';

  constructor(private dataSensorsService: DataSensorsService) {}

  ngOnInit(): void {
    this.refreshDataSensors();
  }

  updateSort(column: string) {
    if (this.sortColumn !== column) {
      // Khi chọn một cột khác, đặt hướng sắp xếp thành 'asc' và cập nhật cột
      this.sortColumn = column;
      this.sortDirection = 'asc';
    } else {
      // Nếu cột đang được sắp xếp, thay đổi hướng sắp xếp
      if (this.sortDirection === 'none') {
        this.sortDirection = 'asc';
      } else if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else {
        // Nếu đang là 'desc', quay lại trạng thái ban đầu ('none') và tải lại dữ liệu
        this.sortDirection = 'none';
      }
    }
    this.refreshDataSensors();
  }

  refreshDataSensors(): void {
    
    let params = new HttpParams();
    if (this.searchTemperature) {
      params = params.set('temperature', this.searchTemperature);
    }
    if (this.searchHumidity) {
      params = params.set('humidity', this.searchHumidity);
    }
    if (this.searchLight) {
      params = params.set('light', this.searchLight);
    }
    if (this.dateString !== '') {
      params = params.set('date', this.dateString);
    }
    if (this.timeString !== '') {
      params = params.set('time', this.timeString);
    }
    if (this.sortDirection !== 'none') {
      params = params.set('sortBy', this.sortColumn);
      params = params.set('sortDir', this.sortDirection);
    }

    params = params.set('page', this.pageNumber - 1);
    params = params.set('size', this.pageSize);
    
    console.log(params.toString());

    this.dataSensorsService.getSearchDataSensors(params.toString()).subscribe((response) => {
      console.log(response);
      this.dataSource = response.content;
      this.collectionSize = response.totalElements;
    });
  }

  onPageChange(newPage: number): void {
    this.pageNumber = newPage;
    this.refreshDataSensors();
  }

  onDateChange() {
    let year = this.date.year.toString();
    let month = this.date.month.toString().padStart(2, '0');;
    let day = this.date.day.toString().padStart(2, '0');

    this.dateString = `${year}-${month}-${day}`;
    this.datetimeString = this.dateString + ' ' + this.timeString;
  }

  onTimeChange() {
    let datetime: Date = new Date(this.time);
    let hour = datetime.getHours().toString().padStart(2, '0');
    let minute = datetime.getMinutes().toString().padStart(2, '0');
    let second = datetime.getSeconds().toString().padStart(2, '0');
    this.timeString = `${hour}:${minute}:${second}`;
    this.datetimeString = this.dateString + ' ' + this.timeString;
  }

  clearTemperature() {
    this.searchTemperature = null;
    this.refreshDataSensors();
  }

  clearHumidity() {
    this.searchHumidity = null;
    this.refreshDataSensors();
  }

  clearLight() {
    this.searchLight = null;
    this.refreshDataSensors();
  }

  clearDate() {
    this.dateString = '';
    this.datetimeString = this.timeString;
  }

  clearTime() {
    this.timeString = '';
    this.datetimeString = this.dateString;
  }

  clearDatetime() {
    this.timeString = '';
    this.dateString = '';
    this.datetimeString = '';
    this.refreshDataSensors();
  }

  clearAll() {
    this.searchTemperature = null;
    this.searchHumidity = null;
    this.searchLight = null;
    this.dateString = '';
    this.timeString = '';
    this.datetimeString = '';
    this.refreshDataSensors();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}

export interface DataSensorsElement {
  id: string;
  temperature: number;
  humidity: number;
  light: number;
  time: string;
}

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 1,
    secondsStep: 1,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: true,
    hoursPlaceholder: 'hh',
    minutesPlaceholder: 'mm',
    secondsPlaceholder: 'ss'
  });
}