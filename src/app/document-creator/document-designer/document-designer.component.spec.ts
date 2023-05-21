import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';

import { DocumentDesignerComponent } from './document-designer.component';

describe('DocumentDesignerComponent', () => {
  let component: DocumentDesignerComponent;
  let fixture: ComponentFixture<DocumentDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDesignerComponent ],
      providers: [BsModalService, BsModalRef],
      imports: [EditorModule, FormsModule]
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
