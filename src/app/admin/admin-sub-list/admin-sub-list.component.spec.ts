import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubListComponent } from './admin-sub-list.component';

describe('AdminSubListComponent', () => {
  let component: AdminSubListComponent;
  let fixture: ComponentFixture<AdminSubListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
