import { Component } from '@angular/core';
import { LabelService } from './label.service';
import { TextPreviewSelectedEvent } from './text-preview/text-preview.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  labels: string;
  selection: TextPreviewSelectedEvent;
  mainText = 'Neurofibromatosis type 1 (NF1), is a haploinsufficient and multisystemic disease, caused by inherited or sporadic mutations in the NF1 gene. Its incidence is one in 2,500 to 3,000 individuals, it has an autosomal dominant pattern of inheritance, high clinical variability, complete penetrance and age-dependent complications. Neurofibromin is the product of the NF1 gene and is believed to act as a tumor suppressor since the loss of its function has been associated with benign and malignant tumors in neural crest-derived tissues. Only two correlations between clinical phenotype and mutant alleles in the NF1 gene have been observed. The established criteria for disease diagnosis are very efficient in adults and children older than 3 years of age, but not for children under this age. Mutational analysis is therefore recommended to confirm the disease in young children with a negative family history. A pathogenic mutation in the NF1 should be added to the list of diagnostic criteria. Mutational analysis is also recommended for differential diagnosis and for prenatal or pre-implantation genetic diagnosis, taking into consideration the family history and the type of method to be applied. Molecular studies of this disease using different complimentary molecular techniques and bioinformatics tools have characterized NF1 gene mutations at both the DNA and mRNA levels, increasing the mutational spectrum. Consequently, about 1,289 defects have been reported to date, mainly nonsense/missense mutations, deletions and splice site defects.';
  edit = false;

  onLabelInput(commaSepparatedString: string) {
    console.log(commaSepparatedString);
  }

  onTextboxSaved(text: string) {
    this.mainText = text;
    this.edit = false;
  }

  onTextPreviewSelected(e: TextPreviewSelectedEvent) {
    console.log(e.indexes);
    this.selection = e;
  }

  onTextPreviewUnselected() {
    this.selection = undefined;
  }

  onEditTextClick() {
    this.edit = true;
  }

  onLabelSelectDialogClosed() {
    this.selection = undefined;
  }
}
