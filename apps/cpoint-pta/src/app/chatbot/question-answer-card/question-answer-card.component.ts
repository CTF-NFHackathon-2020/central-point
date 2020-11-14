import { Component, OnInit, Input } from '@angular/core';
import { LexIntent } from '../lex.interface';
import { Store, Select } from '@ngxs/store';
import { ChatbotActions } from '../chatbot.actions';
import { ChatbotState } from '../chatbot.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-answer-card',
  templateUrl: './question-answer-card.component.html',
  styleUrls: ['./question-answer-card.component.scss']
})
export class QuestionAnswerCardComponent implements OnInit {

  @Input() question: string;
  @Input() intent: LexIntent;
  nodeName: string;

  @Select(ChatbotState.answer) answer: Observable<string>;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.nodeName = Object.values(this.intent.slots).join(' ').trim()
    this.store.dispatch(new ChatbotActions.QuestionGP3(this.question.toLowerCase().replace('question', ''), this.nodeName))
  }

}
