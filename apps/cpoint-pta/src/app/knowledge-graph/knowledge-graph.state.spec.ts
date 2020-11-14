import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { KnowledgeGraphState} from './knowledge-graph.state';
import { KnowledgeGraphActions } from './knowledge-graph.actions';
import { KnowledgeGraphService } from './knowledge-graph.service';
import { GraphLabelEnum } from './graph.model';
import { take } from 'rxjs/operators';

describe('KnowledgeGraph store', () => {
  let store: Store;
  let kgService : KnowledgeGraphService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([KnowledgeGraphState])],
    }).compileComponents();
    store = TestBed.get(Store);
    kgService = TestBed.inject(KnowledgeGraphService);
  }));

  it('should call getNodeRelations from knowledgeGraph', async () => {
    const spy = spyOn(kgService, 'getNodeRelations');

    const state = await store.dispatch(new KnowledgeGraphActions.GetNodeRelationsByIdentifier('1', GraphLabelEnum.Anatomy)).pipe(take(1)).toPromise();
    expect(spy).toHaveBeenCalledWith('1', GraphLabelEnum.Anatomy)

  });

});
