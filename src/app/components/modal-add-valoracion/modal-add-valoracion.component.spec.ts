import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddValoracionComponent } from './modal-add-valoracion.component';

describe('ModalAddValoracionComponent', () => {
  let component: ModalAddValoracionComponent;
  let fixture: ComponentFixture<ModalAddValoracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddValoracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddValoracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
