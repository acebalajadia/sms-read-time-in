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
    rawdata;
    messages: any = [];
    timelogs: any = JSON.parse('[{"address":"(0917) 852 5794","activity":"OUT","name":"jer0me","date":"6/22/2018 11:7","early":0,"late":0,"overtime":0,"justification":""},{"address":"(0917) 852 5794","activity":"IN","name":"ems","date":"6/22/2018 9:46","early":14,"late":0,"overtime":0,"justification":""},{"address":"(0917) 852 5794","activity":"IN","name":"jer0me","date":"6/22/2018 7:37","early":23,"late":0,"overtime":0,"justification":"Justification: Arrived 656 in store but opening rider arrived 736."},{"address":"(0917) 852 5794","activity":"IN","name":"jeff","date":"6/22/2018 7:18","early":0,"late":18,"overtime":0,"justification":""},{"address":"(0917) 852 5794","activity":"OUT","name":"jeff","date":"6/21/2018 20:8","early":0,"late":0,"overtime":0,"justification":""},{"address":"(0917) 852 5794","activity":"OUT","name":"cris","date":"6/21/2018 19:56","early":0,"late":0,"overtime":56,"justification":""},{"address":"(0917) 852 5794","activity":"OUT","name":"Time0ut-js0n","date":"6/21/2018 17:44","early":0,"late":0,"overtime":0,"justification":""},{"address":"(0917) 852 5794","activity":"IN","name":"js0n","date":"6/21/2018 8:3","early":0,"late":3,"overtime":0,"justification":""},{"address":"(0917) 852 5794","activity":"IN","name":"cris","date":"6/21/2018 7:35","early":25,"late":0,"overtime":0,"justification":"Justification: Arrived 7:02 in store but opening rider arrived 7:36."},{"address":"(0917) 852 5794","activity":"IN","name":"jeff","date":"6/21/2018 7:21","early":0,"late":21,"overtime":0,"justification":""},{"address":"(0917) 852 5794","activity":"OUT","name":"jer0me","date":"6/20/2018 19:12","early":0,"late":0,"overtime":0,"justification":""},{"address":"(0917) 852 5794","activity":"OUT","name":"jer0me","date":"6/20/2018 19:11","early":0,"late":0,"overtime":0,"justification":""},{"address":"(0917) 852 5794","activity":"OUT","name":"cris","date":"6/20/2018 19:1","early":0,"late":0,"overtime":0,"justification":""},{"address":"(0917) 852 5794","activity":"OUT","name":"out,js0n","date":"6/20/2018 17:14","early":0,"late":0,"overtime":0,"justification":""},{"address":"(0917) 852 5794","activity":"IN","name":"cris","date":"6/20/2018 7:31","early":29,"late":0,"overtime":0,"justification":"Justification: Arrived 6:50 in store but opening rider arrived 7:34."}]');

    constructor(public platform: Platform, public androidPermissions: AndroidPermissions) {
        //this.checkPermission()
    }
    generateLeg2Report() {
        var mobile = '(0917) 852 5794';
        this.ReadSMSList(mobile);
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
    ReadSMSList(mobile = '(0917) 852 5794') {//default leg 2

        this.platform.ready().then((readySource) => {

            let filter = {
                box: 'inbox', // 'inbox' (default), 'sent', 'draft'
                indexFrom: 0, // start from index 0
                maxCount: 20, // count of SMS to return each time
                address: mobile,
            };

            if (SMS) SMS.listSMS(filter, (ListSms) => {
                this.messages = ListSms;

                var smsdata = ListSms.filter(function (item) {
                    return (item.body.toLowerCase().substr(0, 4) == 'time');
                });
 
                var result = $.map(smsdata, function (item, i) {

                    var date = new Date(item.date_sent);
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();
                    var hour = date.getHours();
                    var minute = date.getMinutes();
                    var fulldate = month + '/' + day + '/' + year;
                    var time = hour + ':' + minute;
                    var fulldatetime = fulldate + ' ' + time;

                    var prefix = item.body.substr(0, 6);//get first 6 chars
                    var activity;
                    prefix = prefix.toLowerCase().replace(/ /g, '').substr(0, 5);//remove space and get 5 chars

                    if (prefix == 'timei') {
                        activity = 'IN';
                    }
                    else if (prefix == 'timeo' || prefix == 'time0') {
                        activity = 'OUT'
                    }

                    //get name
                    var msg = '';
                    if (item.body.toLowerCase().indexOf('justification') > 0) {
                        msg = item.body.substr(0, item.body.toLowerCase().indexOf('justification')).trim().replace('-', ' ').replace(',', ' ').split(' ');
                    }
                    else {
                        msg = item.body.trim().replace('-', ' ').replace(',', ' ').split(' ');
                    }

                    var name = msg[msg.length - 1];

                    //get justification
                    var justification = '';
                    if (item.body.toLowerCase().indexOf('justification') > 0) {
                        justification = item.body.substr(item.body.toLowerCase().indexOf('justification')+15, item.body.length).trim();
                    }

                    var timein: any = new Date(fulldatetime);
                    var timeinHours = timein.getHours();
                    var timeinMinutes = timein.getMinutes();
                    var sched: any = new Date();
                    var early = 0;
                    var late = 0;
                    var diffMs = 0;
                    var overtime = 0;

                    switch (timeinHours) {
                        case 6:
                            sched = new Date(fulldate + ' ' + '7:00');
                        case 7:
                            if (timeinMinutes > 30) {
                                //either superlate or super early for 8am
                                //fall to 8am schedule
                                sched = new Date(fulldate + ' ' + '8:00');
                                break;
                            }
                            sched = new Date(fulldate + ' ' + '7:00');
                            break;
                        case 8:
                            sched = new Date(fulldate + ' ' + '8:00');
                            break;
                        case 9:
                        case 10:
                            sched = new Date(fulldate + ' ' + '10:00');
                            break;
                        case 14:
                        case 15:
                            sched = new Date(fulldate + ' ' + '15:00');
                            break;

                        case 16:
                            sched = new Date(fulldate + ' ' + '16:00');
                        case 17:
                        case 18:
                            sched = new Date(fulldate + ' ' + '17:00');
                        case 19:
                        case 20:
                        case 21:
                            sched = new Date(fulldate + ' ' + '19:00');
                            break;
                    }

                    if (activity == 'IN') {
                        //calculate late
                        diffMs = Math.round((((sched - timein) % 86400000) % 3600000) / 60000); // minutes
                        if (diffMs > 0) {
                            early = diffMs;
                        }
                        else {
                            late = diffMs = Math.round((((timein - sched) % 86400000) % 3600000) / 60000); // minutes;
                        }
                    }
                    else {
                        //calculate overtime
                        diffMs = Math.round((((timein - sched) % 86400000) % 3600000) / 60000); // minutes 
                        if (diffMs > 15)
                            overtime = diffMs;
                    }




                    return {
                        address: item.address,
                        activity: activity,
                        name: name,
                        date: fulldatetime,
                        early: early,
                        late: late,
                        overtime: overtime,
                        justification: justification
                    };
                });

                this.rawdata = JSON.stringify(smsdata) 
                this.data = JSON.stringify(result); 
                
                this.timelogs = result;
            },

                Error => {
                    alert(JSON.stringify(Error))
                });

        });
    }

}
