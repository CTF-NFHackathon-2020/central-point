export type StringMap = {[key: string]: string};

export interface LexIntent {
  intentName: 'AddSymptom' | 'AddPainLevel' | 'AddAnxietyLevel' | 'GetPainRecords' | 'GetAnxietyRecords' | 'AddDrugIntake';
  message: string;
  slots: StringMap;
  dialogState: 'ReadyForFulfillment' | 'ElecitSlot' | 'ConfirmIntent' | 'Failed';
}
