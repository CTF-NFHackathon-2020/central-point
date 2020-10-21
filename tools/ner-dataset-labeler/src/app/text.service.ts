import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Label } from './label.service';

export interface LabeledWord {
  text: string;
  labelName: string;
  labelColor: string;
}


@Injectable({
  providedIn: 'root'
})
export class TextService {
  private currentText: string;
  public currentText$: BehaviorSubject<string>;

  private labeledText: LabeledWord[];
  public labeledText$: BehaviorSubject<LabeledWord[]>;

  constructor() {
    this.currentText = 'Neurofibromatosis type 1 (NF1), is a haploinsufficient and multisystemic disease, caused by inherited or sporadic mutations in the NF1 gene. Its incidence is one in 2,500 to 3,000 individuals, it has an autosomal dominant pattern of inheritance, high clinical variability, complete penetrance and age-dependent complications. Neurofibromin is the product of the NF1 gene and is believed to act as a tumor suppressor since the loss of its function has been associated with benign and malignant tumors in neural crest-derived tissues. Only two correlations between clinical phenotype and mutant alleles in the NF1 gene have been observed. The established criteria for disease diagnosis are very efficient in adults and children older than 3 years of age, but not for children under this age. Mutational analysis is therefore recommended to confirm the disease in young children with a negative family history. A pathogenic mutation in the NF1 should be added to the list of diagnostic criteria. Mutational analysis is also recommended for differential diagnosis and for prenatal or pre-implantation genetic diagnosis, taking into consideration the family history and the type of method to be applied. Molecular studies of this disease using different complimentary molecular techniques and bioinformatics tools have characterized NF1 gene mutations at both the DNA and mRNA levels, increasing the mutational spectrum. Consequently, about 1,289 defects have been reported to date, mainly nonsense/missense mutations, deletions and splice site defects.';
    this.currentText$ = new BehaviorSubject<string>(this.currentText);

    this.labeledText$ = new BehaviorSubject([]);
  }

  public updateText(newText: string) {
    this.currentText = newText;
    this.currentText$ .next(this.currentText);
  }

  public updateLabeledText(labels: Label[]) {
    const splitedText = this.currentText.split(' ');

    let formatedLabels = [];
    labels.forEach(label => {
      const indexes = Array.from(label.indexes);
      indexes.forEach(index => {
        const labelName = label.indexes.has(index - 1) ? 'I-' + label.name : 'B-' + label.name;
        formatedLabels = [...formatedLabels, {index, labelName, color: label.color}];
      });
    });

    this.labeledText = splitedText.map((word, i) => {
      const formatedLabel = formatedLabels.find(fl => fl.index === i);
      const labelName = formatedLabel ? formatedLabel.labelName : '0';
      const labelColor = formatedLabel?.color;
      return {text: word, labelName, labelColor};
    });
    this.labeledText$.next(this.labeledText);
  }

}
