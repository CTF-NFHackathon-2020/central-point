import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { KnowledgeGraphState} from './knowledge-graph.state';
import { KnowledgeGraphActions } from './knowledge-graph.actions';
import { KnowledgeGraphService } from './knowledge-graph.service';
import { GraphLabelEnum } from './graph.model';

describe('KnowledgeGraph store', () => {
  let store: Store;
  let kgService : KnowledgeGraphService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([KnowledgeGraphState])],
        providers: [
          {
            provide: KnowledgeGraphService, useValue: {getNodeRelations : (s, l) => ({nodes:[], relations:[]})}
          }]
    }).compileComponents();
    store = TestBed.get(Store);
    kgService = TestBed.inject(KnowledgeGraphService);
  }));

  it('should call getNodeRelations from knowledgeGraph', () => {
    const spy = spyOn(kgService, 'getNodeRelations');

    store.dispatch(new KnowledgeGraphActions.GetNodeRelations('1', GraphLabelEnum.Anatomy)).subscribe(x => {
      expect(spy).toHaveBeenCalledWith('1', GraphLabelEnum.Anatomy)
    });

  });

});
