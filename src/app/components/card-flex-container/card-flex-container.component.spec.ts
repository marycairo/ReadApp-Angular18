import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFlexContainerComponent } from './card-flex-container.component';

describe('CardFlexContainerComponent', () => {
  let component: CardFlexContainerComponent;
  let fixture: ComponentFixture<CardFlexContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFlexContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFlexContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
