export type StringMap = {[key: string]: string};

export interface LexIntent {
  intentName: 'AddSymptom' | 'AddPainLevel' | 'AddAnxietyLevel' | 'GetPainRecords' | 'GetAnxietyRecords' | 'AddDrugIntake' | 'Chat' | 'GetGraph';
  message: string;
  slots: StringMap;
  dialogState: 'ReadyForFulfillment' | 'ElecitSlot' | 'ElicitIntent' | 'ConfirmIntent' | 'Failed';
}
