import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecomendacionComponent } from './card-recomendacion.component';

describe('CardRecomendacionComponent', () => {
  let component: CardRecomendacionComponent;
  let fixture: ComponentFixture<CardRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRecomendacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
