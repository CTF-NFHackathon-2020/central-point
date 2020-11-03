import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, NgxsOnInit } from '@ngxs/store';
import { AwsLexService } from './aws-lex.service';
import { ChatbotActions } from './chatbot.actions';
import { SpeechRecognitionService } from './speech-recognition.service';

export interface ChatbotStateModel {
  dialogText: string;
}

@Injectable()
@State<ChatbotStateModel>({
  name: 'chatbot',
  defaults: {
    dialogText: '',
  }
})
export class ChatbotState {

  constructor(
    private readonly speechRecognition: SpeechRecognitionService,
    private readonly lex: AwsLexService
    ) {

  }

  @Selector()
  public static dialogText(state: ChatbotStateModel) {
    return state.dialogText;
  }

  @Selector()
  public static getState(state: ChatbotStateModel) {
    return state;
  }

  @Action(ChatbotActions.UpdateDialogText)
  private updateDialogText(ctx: StateContext<ChatbotState>, action: ChatbotActions.UpdateDialogText) {
    return ctx.patchState({dialogText: action.text});
  }

  @Action(ChatbotActions.DetectTextIntent)
  private async detectTextIntent(ctx: StateContext<ChatbotState>, action: ChatbotActions.DetectTextIntent) {
    const lexResponse = await this.lex.detectIntent(action.text);
    console.log(lexResponse);
    return ctx.patchState({dialogText: action.text});
  }
}
