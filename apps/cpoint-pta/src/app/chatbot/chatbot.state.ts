import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, NgxsOnInit } from '@ngxs/store';
import { AwsLexService } from './aws-lex.service';
import { ChatbotActions } from './chatbot.actions';
import { LexIntent} from './lex.interface';
import { SpeechRecognitionService } from './speech-recognition.service';

export interface ChatRecord {
  text: string;
  intent: LexIntent;
}
export interface ChatbotStateModel {
  chatText: string;
  chatHistory: ChatRecord[];
}

@Injectable()
@State<ChatbotStateModel>({
  name: 'chatbot',
  defaults: {
    chatText: '',
    chatHistory: [],
  }
})
export class ChatbotState {

  constructor(
    private readonly speechService: SpeechRecognitionService,
    private readonly lex: AwsLexService) { }

  @Selector()
  public static chatText(state: ChatbotStateModel) {
    return state.chatText;
  }

  @Selector()
  public static chatHistory(state: ChatbotStateModel) {
    return state.chatHistory;
  }

  @Selector()
  public static chatHistoryByIndex(state: ChatbotStateModel, index: number) {
    return state.chatHistory[index];
  }

  @Selector()
  public static getState(state: ChatbotStateModel) {
    return state;
  }

  @Action(ChatbotActions.UpdateChatText)
  private updateChatText(ctx: StateContext<ChatbotStateModel>, action: ChatbotActions.UpdateChatText) {
    return ctx.patchState({chatText: action.text});
  }

  @Action(ChatbotActions.DetectTextIntent)
  private async detectTextIntent(ctx: StateContext<ChatbotStateModel>, action: ChatbotActions.DetectTextIntent) {
    const state = ctx.getState();
    if (action.text.length > 0) {
      const lexResponse = await this.lex.detectIntent(action.text);
      console.log(lexResponse);
      return ctx.setState({
        ...state,
        chatText: '',
        chatHistory: [...state.chatHistory, { text: action.text, intent: lexResponse }],
      });
    }
    return ctx.patchState({chatText: ''});
  }
}
