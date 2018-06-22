import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
declare var SMS: any;
import { AndroidPermissions } from '@ionic-native/android-permissions';
import * as $ from 'jquery'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    data;

    messages: any = [];
    constructor(public platform: Platform, public androidPermissions: AndroidPermissions) {
        this.checkPermission()
    }
    sendreport() {
        this.checkPermission();
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

                var data = ListSms.filter(function (item) {
                    return (item.body.toLowerCase().substr(0, 4) == 'time');
                });

                var result = $.map(data, function (item, i) {

                    var date = new Date(item.date_sent);
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();
                    var hour = date.getHours();
                    var minute = date.getMinutes();
                    var fulldate = month + '/' + day + '/' + year;
                    var time = hour + ':' + minute;

                    var prefix = item.body.substr(0, 6);//get first 6 chars
                    var activity;
                    prefix = prefix.toLowerCase().replace(/ /g, '').substr(0, 5);//remove space and get 5 chars

                    if (prefix == 'timei')
                        activity = 'IN';
                    else if (prefix == 'timeo' || prefix == 'time0')
                        activity = 'OUT'

                    //get name
                    var msg = '';
                    if (item.body.toLowerCase().indexOf('justification') > 0)
                        msg = item.body.substr(0, item.body.toLowerCase().indexOf('justification')).trim().split(' ');
                    else
                        msg = item.body.trim().split(' ');

                    var name = msg[msg.length - 1];

                    //get justification
                    var justification = '';
                    if (item.body.toLowerCase().indexOf('justification') > 0) {
                        justification = item.body.substr(item.body.toLowerCase().indexOf('justification'), item.body.length).trim();
                    }

                    return {
                        address: item.address,
                        activity: activity,
                        name: name,
                        date: fulldate,
                        time: time,
                        justification: justification
                    };
                });

                this.data = JSON.stringify(result);

            },

                Error => {
                    alert(JSON.stringify(Error))
                });

        });
    }

}
