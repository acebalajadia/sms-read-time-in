import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AccordionComponent } from './accordion/accordion';
import { AccordionHeadingComponent } from './accordion/accordion-heading/accordion-heading';
import { AccordionContentComponent } from './accordion/accordion-content/accordion-content';
import { AccordionItemComponent } from './accordion/accordion-item/accordion-item';
@NgModule({
	declarations: [AccordionComponent,
    AccordionHeadingComponent,
    AccordionContentComponent,
    AccordionItemComponent],
    imports: [IonicModule],
	exports: [AccordionComponent,
    AccordionHeadingComponent,
    AccordionContentComponent,
    AccordionItemComponent]
})
export class ComponentsModule {}
