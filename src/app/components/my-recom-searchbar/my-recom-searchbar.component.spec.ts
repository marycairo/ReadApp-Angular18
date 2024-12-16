import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecomSearchbarComponent } from './my-recom-searchbar.component';

describe('MyRecomSearchbarComponent', () => {
  let component: MyRecomSearchbarComponent;
  let fixture: ComponentFixture<MyRecomSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRecomSearchbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRecomSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
