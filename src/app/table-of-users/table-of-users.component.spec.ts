import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfUsersComponent } from './table-of-users.component';

describe('TableOfUsersComponent', () => {
  let component: TableOfUsersComponent;
  let fixture: ComponentFixture<TableOfUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOfUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOfUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
