import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilLibrosLeidosComponent } from './libros-leidos.component';

describe('PerfilLibrosLeidosComponent', () => {
  let component: PerfilLibrosLeidosComponent;
  let fixture: ComponentFixture<PerfilLibrosLeidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilLibrosLeidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilLibrosLeidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
