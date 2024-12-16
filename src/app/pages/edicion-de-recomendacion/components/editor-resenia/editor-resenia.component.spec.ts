import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorReseniaComponent } from './editor-resenia.component';

describe('EditorReseniaComponent', () => {
  let component: EditorReseniaComponent;
  let fixture: ComponentFixture<EditorReseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorReseniaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
