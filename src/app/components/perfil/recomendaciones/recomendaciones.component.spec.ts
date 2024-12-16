import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilRecomendacionesComponent } from './recomendaciones.component';

describe('PerfilRecomendacionesComponent', () => {
  let component: PerfilRecomendacionesComponent;
  let fixture: ComponentFixture<PerfilRecomendacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilRecomendacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilRecomendacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
