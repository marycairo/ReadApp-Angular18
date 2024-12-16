import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilLibrosPorLeerComponent } from './libros-por-leer.component';

describe('PerfilLibrosPorLeerComponent', () => {
  let component: PerfilLibrosPorLeerComponent;
  let fixture: ComponentFixture<PerfilLibrosPorLeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilLibrosPorLeerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilLibrosPorLeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
