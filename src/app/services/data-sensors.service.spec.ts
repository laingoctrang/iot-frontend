import { TestBed } from '@angular/core/testing';

import { DataSensorsService } from './data-sensors.service';

describe('DataSensorsService', () => {
  let service: DataSensorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSensorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
