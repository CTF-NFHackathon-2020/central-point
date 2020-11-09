// tslint:disable-next-line: no-namespace
export namespace UserActions {
  export class UserAction {
    public static readonly type = '[User] Add item';
    constructor(public payload: string) { }
  }
}
