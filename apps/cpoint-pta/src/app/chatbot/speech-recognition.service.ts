import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChatbotActions } from './chatbot.actions';

declare var webkitSpeechRecognition: any;
const recognition = new webkitSpeechRecognition();

@Injectable()
export class SpeechRecognitionService {

  constructor( private store: Store) {
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const lastResponse = event.results[event.results.length - 1];
      if (!lastResponse.isFinal) {
        return this.store.dispatch(new ChatbotActions.UpdateDialogText(lastResponse[0].transcript));
      }

      this.store.dispatch(new ChatbotActions.UpdateDialogText(lastResponse[0].transcript));
      return this.store.dispatch(new ChatbotActions.DetectTextIntent(lastResponse[0].transcript));
    };

    recognition.onend = () => {
      recognition.start();
    };

    recognition.start();
  }
}
