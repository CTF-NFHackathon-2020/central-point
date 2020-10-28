// tslint:disable-next-line: no-namespace
export namespace ChatbotActions {
  export class UpdateDialogText {
    public static readonly type = '[Chatbot] Update dialog text';
    constructor(public text: string) {}
  }

  export class DetectTextIntent {
    public static readonly type = '[Chatbot] Detect text intent';
    constructor(public text: string) {}
  }
}
