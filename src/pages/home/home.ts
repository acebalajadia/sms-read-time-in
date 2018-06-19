import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
declare var SMS: any;
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    data;

    messages: any = [];
    constructor(public platform: Platform, public androidPermissions: AndroidPermissions, private emailComposer: EmailComposer) {
        this.checkPermission()
    }
    checkPermission() {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
            success => {

                //if permission granted
                this.ReadSMSList();
            },
            err => {

                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).
                    then(success => {
                        this.ReadSMSList();
                    },
                        err => {
                            alert("cancelled")
                        });
            });

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

    }
    ReadSMSList() {

        this.platform.ready().then((readySource) => {

            let filter = {
                box: 'inbox', // 'inbox' (default), 'sent', 'draft'
                indexFrom: 0, // start from index 0
                maxCount: 20, // count of SMS to return each time
                address: '(0917) 852 5794',
            };

            if (SMS) SMS.listSMS(filter, (ListSms) => {
                this.messages = ListSms;
                // this.data = JSON.stringify(ListSms);

                this.emailComposer.isAvailable().then((available: boolean) => {
                    if (available) {
                        //Now we know we can send
                        let email = {
                            to: 'acebalajadia@gmail.com', 
                            subject: 'Time in report',
                            body: JSON.stringify(ListSms),
                            // isHtml: true
                        };

                        // Send a text message using default options
                        this.emailComposer.open(email);
                    }
                });

            },

                Error => {
                    alert(JSON.stringify(Error))
                });

        });
    }

}
