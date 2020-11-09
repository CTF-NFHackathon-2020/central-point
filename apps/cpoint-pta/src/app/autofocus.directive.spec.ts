import { ElementRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';

describe('AutofocusDirective', () => {
  it('should create an instance', () => {
    const directive = new AutofocusDirective(new ElementRef(''));
    expect(directive).toBeTruthy();
  });
});
