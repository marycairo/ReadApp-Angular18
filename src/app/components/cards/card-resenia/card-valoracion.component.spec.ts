import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CardValoracionComponent } from './card-valoracion.component'

describe('CardValoracionComponent', () => {
  let component: CardValoracionComponent
  let fixture: ComponentFixture<CardValoracionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardValoracionComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(CardValoracionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
