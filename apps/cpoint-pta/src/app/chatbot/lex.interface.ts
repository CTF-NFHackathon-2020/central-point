export type StringMap = {[key: string]: string};

export interface LexIntent {
  intentName: string;
  message: string;
  slots: StringMap;
}
