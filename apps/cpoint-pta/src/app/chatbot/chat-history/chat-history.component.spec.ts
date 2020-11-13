import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule } from '@ngxs/store';
import { UserState } from 'src/app/user/user.state';

import { ChatHistoryComponent } from './chat-history.component';
import { HttpClientModule } from '@angular/common/http';
import { IntentBadgeComponent } from '../intent-badge/intent-badge.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ChatHistoryComponent', () => {
  let component: ChatHistoryComponent;
  let fixture: ComponentFixture<ChatHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UserState]),
        NgxsSelectSnapshotModule
      ],
      declarations: [ ChatHistoryComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract labels from painRecords as local format', () => {
    expect(component.mapLabels([{date: new Date('10/21/2020'), level: 1}])).toEqual(['21/10/2020']);
  });
});
