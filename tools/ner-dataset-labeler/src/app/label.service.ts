import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Label {
  indexes: Set<number>;
  color: string;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private currentLabels: Map<string, Label>;
  public currentLabels$: BehaviorSubject<Label[]>;

  constructor() {
    this.currentLabels = new Map();
    this.currentLabels$ = new BehaviorSubject([]);
  }

  public addLabel(labelName) {
    console.log('add', labelName)
    this.currentLabels.set(labelName, {
      name: labelName,
      indexes: new Set(),
      color: this.stringToColor(labelName)
    });

    this.currentLabels$.next(Array.from(this.currentLabels.values()));
  }

  public removeLabel(labelName) {
    this.currentLabels.delete(labelName);
    this.currentLabels$.next(Array.from(this.currentLabels.values()));
  }

  public addIndexes(labelName: string, indexes: number[]) {
    const existingLabel  = this.currentLabels.get(labelName);
    indexes.forEach(i => existingLabel.indexes.add(i));
    this.currentLabels$.next(Array.from(this.currentLabels.values()));
  }

  // tslint:disable: no-bitwise
  private stringToColor(str: string): string {
    if (str === 'white') {
      return 'white';
    }

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }
}
