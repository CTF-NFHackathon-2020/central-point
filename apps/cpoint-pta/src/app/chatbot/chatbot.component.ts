import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  constructor(private readonly apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`{
        Anatomy(first:10) {
          name
          bto_id
        }}
      `
    }).valueChanges.subscribe(x => console.log(x))
  }

}
