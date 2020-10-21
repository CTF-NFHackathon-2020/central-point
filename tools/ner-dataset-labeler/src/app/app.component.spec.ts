import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AutofocusDirective } from './autofocus.directive';
import { TextboxComponent } from './textbox/textbox.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AutofocusDirective,
        TextboxComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
