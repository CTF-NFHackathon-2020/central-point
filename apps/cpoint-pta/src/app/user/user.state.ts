import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { UserActions } from './user.actions';

export interface PainRecord {
  date: Date;
  level: number;
}


export interface UserStateModel {
  painRecords: PainRecord[];
}

@Injectable()
@State<UserStateModel>({
  name: 'user',
  defaults: {
    painRecords: [
      {date: new Date('1/10/2020'), level: 4},
      {date: new Date('2/10/2020'), level: 5},
      {date: new Date('3/10/2020'), level: 7},
      {date: new Date('4/10/2020'), level: 9},
      {date: new Date('5/10/2020'), level: 9},
      {date: new Date('6/10/2020'), level: 6},
      {date: new Date('7/10/2020'), level: 4},
    ]
  }
})
export class UserState {

  @Selector()
  public static getState(state: UserStateModel) {
    return state;
  }

  @Selector()
  public static painRecords(state: UserStateModel) {
    return state.painRecords;
  }
}
