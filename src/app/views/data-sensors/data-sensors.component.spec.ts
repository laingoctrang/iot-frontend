import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSensorsComponent } from './data-sensors.component';

describe('DataSensorsComponent', () => {
  let component: DataSensorsComponent;
  let fixture: ComponentFixture<DataSensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSensorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
