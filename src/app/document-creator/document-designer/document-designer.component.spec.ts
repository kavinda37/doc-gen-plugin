import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDesignerComponent } from './document-designer.component';

describe('DocumentDesignerComponent', () => {
  let component: DocumentDesignerComponent;
  let fixture: ComponentFixture<DocumentDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDesignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
