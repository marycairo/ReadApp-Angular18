import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTituloComponent } from './editor-titulo.component';

describe('EditorTituloComponent', () => {
  let component: EditorTituloComponent;
  let fixture: ComponentFixture<EditorTituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorTituloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
