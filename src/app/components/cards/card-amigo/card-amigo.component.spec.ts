import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAmigoComponent } from './card-amigo.component';

describe('CardAmigoComponent', () => {
  let component: CardAmigoComponent;
  let fixture: ComponentFixture<CardAmigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAmigoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAmigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
