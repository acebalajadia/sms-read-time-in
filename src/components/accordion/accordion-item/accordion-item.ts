import { AccordionHeadingComponent } from './../accordion-heading/accordion-heading';
import { Component, forwardRef, ContentChild } from '@angular/core';

/**
 * Generated class for the AccordionItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion-item',
  templateUrl: 'accordion-item.html'
})
export class AccordionItemComponent {
    @ContentChild(forwardRef(() => AccordionHeadingComponent)) heading: AccordionHeadingComponent;
    opened: boolean = false;
 
  constructor() {
    // console.log('Hello AccordionItemComponent Component'); 
  }
    ngAfterContentInit() {
        this.heading.toggled.subscribe(() => {
            this.opened = !this.opened;
        });
    }
}
