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



@NgModule({
  declarations: [
    AutofocusDirective,
    ResponseCardComponent,
    ChatHistoryComponent,
    ChatDialogComponent,
    ChatbotComponent,
    IntentBadgeComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forRoot([ChatbotState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  exports: [ChatbotComponent],
  providers: [ ChatbotState, SpeechRecognitionService ]
})
export class ChatbotModule { }
