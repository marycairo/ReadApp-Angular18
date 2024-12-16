import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAmigosComponent } from './amigos.component';

describe('PerfilAmigosComponent', () => {
  let component:PerfilAmigosComponent;
  let fixture: ComponentFixture<PerfilAmigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilAmigosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
