import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModItemComponent } from './mod-item.component';

describe('ModItemComponent', () => {
  let component: ModItemComponent;
  let fixture: ComponentFixture<ModItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
