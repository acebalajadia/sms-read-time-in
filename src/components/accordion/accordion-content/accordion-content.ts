import { Component } from '@angular/core';

/**
 * Generated class for the AccordionContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion-content',
  templateUrl: 'accordion-content.html'
})
export class AccordionContentComponent {

  text: string;

  constructor() {
    console.log('Hello AccordionContentComponent Component');
    this.text = 'Hello World';
  }

}
