// tslint:disable-next-line: no-namespace
export namespace ChatbotActions {
  export class UpdateChatText {
    public static readonly type = '[Chatbot] Update dialog text';
    constructor(public text: string) {}
  }

  export class DetectTextIntent {
    public static readonly type = '[Chatbot] Detect text intent';
    constructor(public text: string) {}
  }

  export class ChatWithGPT3 {
    public static readonly type = '[Chatbot] Chat with GPT3';
    constructor(public text: string) {}
  }

  export class QuestionGP3 {
    public static readonly type = '[Chatbot] Question GPT3';
    constructor (public question: string, public nodeName: string) {}
  }
}
