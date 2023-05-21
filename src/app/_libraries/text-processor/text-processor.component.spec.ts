import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextProcessorComponent } from './text-processor.component';

describe('TextProcessorComponent', () => {
  let component: TextProcessorComponent;
  let fixture: ComponentFixture<TextProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextProcessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
