import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteRecComponent } from './modal-delete-rec.component';

describe('ModalDeleteRecComponent', () => {
  let component: ModalDeleteRecComponent;
  let fixture: ComponentFixture<ModalDeleteRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteRecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
