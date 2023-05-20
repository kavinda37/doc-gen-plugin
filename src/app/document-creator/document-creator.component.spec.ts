import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreatorComponent } from './document-creator.component';

describe('DocumentCreatorComponent', () => {
  let component: DocumentCreatorComponent;
  let fixture: ComponentFixture<DocumentCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
