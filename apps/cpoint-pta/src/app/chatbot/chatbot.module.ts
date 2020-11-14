import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot.component';
import { ResponseCardComponent } from './response-card/response-card.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { NgxsModule } from '@ngxs/store';
import { ChatbotState } from './chatbot.state';
import { environment } from 'src/environments/environment';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { AutofocusDirective } from '../autofocus.directive';
import { SpeechRecognitionService } from './speech-recognition.service';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { IntentBadgeComponent } from './intent-badge/intent-badge.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { UserState } from '../user/user.state';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { GraphChartComponent } from './graph-chart/graph-chart.component';
import { KnowledgeGraphState } from '../knowledge-graph/knowledge-graph.state';
import { AngularNeo4jModule } from 'angular-neo4j';


@NgModule({
  declarations: [
    AutofocusDirective,
    ResponseCardComponent,
    ChatHistoryComponent,
    ChatDialogComponent,
    ChatbotComponent,
    IntentBadgeComponent,
    LineChartComponent,
    GraphChartComponent
  ],
  imports: [
    CommonModule,
    NgxsSelectSnapshotModule,
    AngularNeo4jModule,
    NgxsModule.forRoot([
      ChatbotState,
      KnowledgeGraphState,
      UserState
    ], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ChartsModule
  ],
  exports: [ChatbotComponent],
  providers: [ ChatbotState, SpeechRecognitionService ]
})
export class ChatbotModule { }
