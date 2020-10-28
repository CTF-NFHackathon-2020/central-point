import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ChatbotActions } from '../chatbot.actions';
import { ChatbotState } from '../chatbot.state';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

  @Select(ChatbotState.dialogText) dialogText$: Observable<string>;

  constructor(private readonly store: Store) {

  }

  ngOnInit(): void {
  }

  onSendButtonClick(e) {
    console.log(e.target.value);
    const currentText = e.target.value;
    return this.store.dispatch(new ChatbotActions.DetectTextIntent(currentText));
  }

  onKeydown(e) {
    if (e.code !== 'Enter'){
      return this.store.dispatch(new ChatbotActions.UpdateDialogText(e.target.value));
    }
    this.store.dispatch(new ChatbotActions.UpdateDialogText(e.target.value));
    return this.store.dispatch(new ChatbotActions.DetectTextIntent(e.target.value));
  }

}
