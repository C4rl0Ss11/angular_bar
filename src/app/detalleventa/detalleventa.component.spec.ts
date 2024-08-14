import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVentaComponent } from './detalleventa.component';

describe('DetalleventaComponent', () => {
  let component: DetalleVentaComponent;
  let fixture: ComponentFixture<DetalleVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleVentaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
