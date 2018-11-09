import { ComponentsModule } from './../components/components.module';
import { FirstCapsPipe } from './../pipes/first-caps/first-caps';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { EmailComposer } from '@ionic-native/email-composer';
import { Screenshot } from '@ionic-native/screenshot';

@NgModule({
  declarations: [MyApp, HomePage, FirstCapsPipe],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), ComponentsModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    AndroidPermissions,
    StatusBar,
    SplashScreen,
    EmailComposer,
    Screenshot,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
