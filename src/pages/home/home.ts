import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
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
    // timelogs: any = JSON.parse('[{"branch":"leg1","address":"(0917) 852 5794","activity":"IN","name":"jer0me","date":"6/22/2018 15:13","early":0,"late":13,"overtime":0,"justification":""},{"branch":"","address":"+639175517548","activity":"IN","name":"in:eman","date":"6/22/2018 15:4","early":0,"late":4,"overtime":0,"justification":""},{"branch":"","address":"+639178523162","activity":"IN","name":"angelo","date":"6/22/2018 14:14","early":46,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+639178523162","activity":"OUT","name":"angelo","date":"6/22/2018 11:33","early":0,"late":0,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"OUT","name":"jer0me","date":"6/22/2018 11:7","early":0,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+639175517548","activity":"OUT","name":"out:eman","date":"6/22/2018 11:4","early":0,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0584","activity":"IN","name":":mark","date":"6/22/2018 9:53","early":7,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0854","activity":"IN","name":"ericson","date":"6/22/2018 9:51","early":9,"late":0,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"IN","name":"ems","date":"6/22/2018 9:46","early":14,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+639175517548","activity":"IN","name":"timein:ben","date":"6/22/2018 8:9","early":0,"late":9,"overtime":0,"justification":""},{"branch":"","address":"+639178523162","activity":"IN","name":"bham","date":"6/22/2018 7:57","early":3,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0584","activity":"IN","name":"in:erics0n","date":"6/22/2018 7:49","early":11,"late":0,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"IN","name":"jer0me","date":"6/22/2018 7:37","early":0,"late":37,"overtime":0,"justification":"Arrived 656 in store but opening rider arrived 736."},{"branch":"","address":"+63 917 533 0854","activity":"IN","name":"chano","date":"6/22/2018 7:22","early":0,"late":22,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"IN","name":"jeff","date":"6/22/2018 7:18","early":0,"late":18,"overtime":0,"justification":""},{"branch":"","address":"+63 917 838 5603","activity":"IN","name":"bryan","date":"6/22/2018 7:15","early":0,"late":15,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0584","activity":"IN","name":":mark","date":"6/22/2018 7:11","early":0,"late":11,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0584","activity":"IN","name":":RR","date":"6/22/2018 7:10","early":0,"late":10,"overtime":0,"justification":""},{"branch":"","address":"+63 917 838 5603","activity":"IN","name":"chan","date":"6/22/2018 7:10","early":0,"late":10,"overtime":0,"justification":""},{"branch":"","address":"+639175517548","activity":"IN","name":"in:eman","date":"6/22/2018 7:9","early":0,"late":9,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0854","activity":"IN","name":"in:paul","date":"6/22/2018 6:59","early":1,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+639175517548","activity":"IN","name":"js0n","date":"6/22/2018 6:43","early":17,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+639178523162","activity":"IN","name":"b0t/angelo","date":"6/22/2018 6:22","early":38,"late":0,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"OUT","name":"jeff","date":"6/21/2018 20:8","early":0,"late":0,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"OUT","name":"cris","date":"6/21/2018 19:56","early":0,"late":0,"overtime":56,"justification":""},{"branch":"","address":"+639175517548","activity":"OUT","name":"angelo","date":"6/21/2018 19:50","early":0,"late":0,"overtime":50,"justification":""},{"branch":"","address":"+639175517548","activity":"OUT","name":"timeout:ben","date":"6/21/2018 19:28","early":0,"late":0,"overtime":28,"justification":""} ]');
    timelogs: any = [];

    constructor(public platform: Platform, public androidPermissions: AndroidPermissions, private loadingCtrl: LoadingController) {
        //this.checkPermission()
    }
    
    getData() {
        const loading = this.loadingCtrl.create();
        loading.present();

        // this.ReadSMSList();

        //for testing only
        let smsdata = [{"_id":11110,"thread_id":9,"address":"(0917) 852 5794","date":1529651614288,"date_sent":1529651611000,"read":0,"status":-1,"type":1,"body":"Time in jer0me","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11109,"thread_id":11,"address":"+639175517548","date":1529651100969,"date_sent":1529651098000,"read":0,"status":-1,"type":1,"body":"time in:eman","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11108,"thread_id":8,"address":"+639178523162","date":1529648070917,"date_sent":1529648063000,"read":1,"status":-1,"type":1,"body":"Time in angelo ","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11104,"thread_id":8,"address":"+639178523162","date":1529638400449,"date_sent":1529638398000,"read":1,"status":-1,"type":1,"body":"Time out angelo ","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11103,"thread_id":9,"address":"(0917) 852 5794","date":1529636825533,"date_sent":1529636823000,"read":1,"status":-1,"type":1,"body":"Time 0ut jer0me","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11102,"thread_id":11,"address":"+639175517548","date":1529636655079,"date_sent":1529636652000,"read":1,"status":-1,"type":1,"body":"time out:eman","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11094,"thread_id":10,"address":"+63 917 533 0584","date":1529632687678,"date_sent":1529632399000,"read":1,"status":-1,"type":1,"body":"TIME IN :mark  ","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11093,"thread_id":254,"address":"+63 917 533 0854","date":1529632682483,"date_sent":1529632319000,"read":1,"status":-1,"type":1,"body":"Time in ericson","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11092,"thread_id":9,"address":"(0917) 852 5794","date":1529632115549,"date_sent":1529631995000,"read":1,"status":-1,"type":1,"body":"Time in ems","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11091,"thread_id":11,"address":"+639175517548","date":1529631316184,"date_sent":1529626161000,"read":1,"status":-1,"type":1,"body":"timein:ben","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11090,"thread_id":8,"address":"+639178523162","date":1529631315783,"date_sent":1529625460000,"read":1,"status":-1,"type":1,"body":"Time in bham","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11089,"thread_id":10,"address":"+63 917 533 0584","date":1529631315331,"date_sent":1529624964000,"read":1,"status":-1,"type":1,"body":"Time in:erics0n ","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11088,"thread_id":9,"address":"(0917) 852 5794","date":1529631314957,"date_sent":1529624244000,"read":1,"status":-1,"type":1,"body":"TIME IN: jer0me\nJustification: Arrived 656 in store but opening rider arrived 736. ","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11087,"thread_id":254,"address":"+63 917 533 0854","date":1529631314665,"date_sent":1529623326000,"read":1,"status":-1,"type":1,"body":"Time in chano","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1},{"_id":11086,"thread_id":9,"address":"(0917) 852 5794","date":1529631314242,"date_sent":1529623114000,"read":1,"status":-1,"type":1,"body":"Time in jeff","service_center":"+639170000299","locked":0,"sub_id":3,"error_code":0,"creator":"com.textra","seen":0,"priority":-1}];

        this.processSMS(smsdata);
      
        loading.dismiss();
    } 

    generateLeg1Report() {
        var mobile = '+639178523162';
        this.ReadSMSList(mobile);
    }
    generateLeg2Report() {
        var mobile = '(0917) 852 5794';
        this.ReadSMSList(mobile);
    }
    generateDrgReport() {
        var mobile = '+639175517548';
        this.ReadSMSList(mobile);
    }
    generateOasReport() {
        var mobile = '+63 917 533 0584';
        this.ReadSMSList(mobile);
    }
    generateGuinobatanReport() {
        var mobile = '+63 917 838 5603';
        this.ReadSMSList(mobile);
    }
    generateLigaoReport() {
        var mobile = '+63 917 533 0854';
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
    ReadSMSList(mobile = '') {//default leg 2

        this.platform.ready().then((readySource) => {
            const loading = this.loadingCtrl.create();
            loading.present();

            let filter = {
                box: 'inbox', // 'inbox' (default), 'sent', 'draft'
                indexFrom: 0, // start from index 0
                maxCount: 100, // count of SMS to return each time
                address: mobile,
            };

            if (SMS) SMS.listSMS(filter, (ListSms) => {
                this.messages = ListSms;

                var smsdata = ListSms.filter(function (item) {
                    return (item.body.toLowerCase().substr(0, 4) == 'time');
                });

                this.processSMS(smsdata);

            },

                Error => {
                    alert(JSON.stringify(Error))
                });

            loading.dismiss();
        });
    }

    processSMS(smsdata){

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
            let filteredMsg = item.body.replace('-',' ').replace(':',' ').trim();
            if (item.body.toLowerCase().indexOf('justification') > 0) {
                msg = filteredMsg.substr(0, filteredMsg.toLowerCase().indexOf('justification')).split(' ');
            }
            else {
                msg = filteredMsg.split(' ');
            }
            var name = msg[msg.length - 1];

            //get justification
            var justification = '';
            if (item.body.toLowerCase().indexOf('justification') > 0) {
                justification = item.body.substr(item.body.toLowerCase().indexOf('justification') + 15, item.body.length).trim();
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
                    if (timeinMinutes > 45) {
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

            var branch = '';
            switch (item.address) {
                case '+639178523162':
                    branch = 'Leg1';
                    break;
                case '(0917) 852 5794':
                    branch = 'Leg2';
                    break;
                case '+639175517548':
                    branch = 'Drg';
                    break;
                case '+63 917 533 0584':
                    branch = 'Oas';
                    break;
                case '+63 917 838 5603':
                    branch = 'Guinobatan';
                    break;
                case '+63 917 533 0854':
                    branch = 'Ligao';
                    break;
            }

            return {
                branch: branch,
                address: item.address,
                activity: activity,
                name: name,
                date: fulldatetime,
                early: early,
                late: late,
                overtime: overtime,
                sched: sched.getHours()+'00',
                justification: justification
            };
        });

        this.rawdata = JSON.stringify(smsdata)
        this.data = JSON.stringify(result);

        this.timelogs = result;

        
    }

}
