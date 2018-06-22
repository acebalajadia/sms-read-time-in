import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the AccordionHeadingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'accordion-heading',
    templateUrl: 'accordion-heading.html'
})
export class AccordionHeadingComponent {
    @Output() toggled = new EventEmitter<boolean>();

    constructor() {
        console.log('Hello AccordionHeadingComponent Component');

    }
    toggle() {
        this.toggled.emit(true);
    }
}
