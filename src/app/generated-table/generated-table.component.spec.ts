import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedTableComponent } from './generated-table.component';
 

describe('GeneratedTableComponent', () => {
  let component: GeneratedTableComponent;
  let fixture: ComponentFixture<GeneratedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
