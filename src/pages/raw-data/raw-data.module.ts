import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RawDataPage } from './raw-data';

@NgModule({
  declarations: [
    RawDataPage,
  ],
  imports: [
    IonicPageModule.forChild(RawDataPage),
  ],
})
export class RawDataPageModule {}
