import { Directive, AfterContentInit, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {

  @Input() public appAutoFocus: boolean;
  constructor(private readonly el: ElementRef) { }

  public ngAfterContentInit() {
    setInterval(() => {
      this.el.nativeElement.focus();
    }, 500);
  }

}
