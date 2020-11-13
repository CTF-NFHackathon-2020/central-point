import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphChartComponent } from './graph-chart.component';
import { NgxsModule } from '@ngxs/store';
import { KnowledgeGraphState } from 'src/app/knowledge-graph/knowledge-graph.state';
import { KnowledgeGraphService } from 'src/app/knowledge-graph/knowledge-graph.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GraphChartComponent', () => {
  let component: GraphChartComponent;
  let fixture: ComponentFixture<GraphChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      declarations: [ GraphChartComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
