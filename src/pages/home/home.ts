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

    //filters
    noOfMsgsToFetch = 10000;
    startDate = new Date().toISOString();
    endDate = new Date().toISOString();
    mobile = ''; 

    excludeJustification = false;
    
    noData = false;
    reportGenerated = false;
    finalProcessedData;
    rawdata;
    rawdataJson;
    messages: any = [];
    // timelogs: any = JSON.parse('[{"branch":"leg1","address":"(0917) 852 5794","activity":"IN","name":"jer0me","date":"6/22/2018 15:13","early":0,"late":13,"overtime":0,"justification":""},{"branch":"","address":"+639175517548","activity":"IN","name":"in:eman","date":"6/22/2018 15:4","early":0,"late":4,"overtime":0,"justification":""},{"branch":"","address":"+639178523162","activity":"IN","name":"angelo","date":"6/22/2018 14:14","early":46,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+639178523162","activity":"OUT","name":"angelo","date":"6/22/2018 11:33","early":0,"late":0,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"OUT","name":"jer0me","date":"6/22/2018 11:7","early":0,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+639175517548","activity":"OUT","name":"out:eman","date":"6/22/2018 11:4","early":0,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0584","activity":"IN","name":":mark","date":"6/22/2018 9:53","early":7,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0854","activity":"IN","name":"ericson","date":"6/22/2018 9:51","early":9,"late":0,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"IN","name":"ems","date":"6/22/2018 9:46","early":14,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+639175517548","activity":"IN","name":"timein:ben","date":"6/22/2018 8:9","early":0,"late":9,"overtime":0,"justification":""},{"branch":"","address":"+639178523162","activity":"IN","name":"bham","date":"6/22/2018 7:57","early":3,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0584","activity":"IN","name":"in:erics0n","date":"6/22/2018 7:49","early":11,"late":0,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"IN","name":"jer0me","date":"6/22/2018 7:37","early":0,"late":37,"overtime":0,"justification":"Arrived 656 in store but opening rider arrived 736."},{"branch":"","address":"+63 917 533 0854","activity":"IN","name":"chano","date":"6/22/2018 7:22","early":0,"late":22,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"IN","name":"jeff","date":"6/22/2018 7:18","early":0,"late":18,"overtime":0,"justification":""},{"branch":"","address":"+63 917 838 5603","activity":"IN","name":"bryan","date":"6/22/2018 7:15","early":0,"late":15,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0584","activity":"IN","name":":mark","date":"6/22/2018 7:11","early":0,"late":11,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0584","activity":"IN","name":":RR","date":"6/22/2018 7:10","early":0,"late":10,"overtime":0,"justification":""},{"branch":"","address":"+63 917 838 5603","activity":"IN","name":"chan","date":"6/22/2018 7:10","early":0,"late":10,"overtime":0,"justification":""},{"branch":"","address":"+639175517548","activity":"IN","name":"in:eman","date":"6/22/2018 7:9","early":0,"late":9,"overtime":0,"justification":""},{"branch":"","address":"+63 917 533 0854","activity":"IN","name":"in:paul","date":"6/22/2018 6:59","early":1,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+639175517548","activity":"IN","name":"js0n","date":"6/22/2018 6:43","early":17,"late":0,"overtime":0,"justification":""},{"branch":"","address":"+639178523162","activity":"IN","name":"b0t/angelo","date":"6/22/2018 6:22","early":38,"late":0,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"OUT","name":"jeff","date":"6/21/2018 20:8","early":0,"late":0,"overtime":0,"justification":""},{"branch":"","address":"(0917) 852 5794","activity":"OUT","name":"cris","date":"6/21/2018 19:56","early":0,"late":0,"overtime":56,"justification":""},{"branch":"","address":"+639175517548","activity":"OUT","name":"angelo","date":"6/21/2018 19:50","early":0,"late":0,"overtime":50,"justification":""},{"branch":"","address":"+639175517548","activity":"OUT","name":"timeout:ben","date":"6/21/2018 19:28","early":0,"late":0,"overtime":28,"justification":""} ]');
    timelogs: any = [];
    summaryReport: any = [];
    uniqueUsers: any = [];
    uniqueUsersRaw: any = [];

    constructor(public platform: Platform, public androidPermissions: AndroidPermissions, private loadingCtrl: LoadingController) {
        // this.checkPermission(); 
    }
    
    // ionViewDidLoad(){
    //     let loading = this.loadingCtrl.create({ content: "Loading data please wait...",});
    //     loading.present().then(()=>{
    //         this.ReadSMSList();
    //         loading.dismiss();
    //     });
    // } 

    //helper for looping in front end
    getNumber = function (num) {
        return new Array(num);
    }

    getData() {
        //for testing only
        // let smsdata = [{ "_id": 11110, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529651614288, "date_sent": 1529651611000, "read": 0, "status": -1, "type": 1, "body": "Time in jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11109, "thread_id": 11, "address": "+639175517548", "date": 1529651100969, "date_sent": 1529651098000, "read": 0, "status": -1, "type": 1, "body": "time in:eman", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11108, "thread_id": 8, "address": "+639178523162", "date": 1529648070917, "date_sent": 1529648063000, "read": 1, "status": -1, "type": 1, "body": "Time in angelo ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11104, "thread_id": 8, "address": "+639178523162", "date": 1529638400449, "date_sent": 1529638398000, "read": 1, "status": -1, "type": 1, "body": "Time out angelo ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11103, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529636825533, "date_sent": 1529636823000, "read": 1, "status": -1, "type": 1, "body": "Time 0ut jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11102, "thread_id": 11, "address": "+639175517548", "date": 1529636655079, "date_sent": 1529636652000, "read": 1, "status": -1, "type": 1, "body": "time out:eman", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11094, "thread_id": 10, "address": "+63 917 533 0584", "date": 1529632687678, "date_sent": 1529632399000, "read": 1, "status": -1, "type": 1, "body": "TIME IN :mark  ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11093, "thread_id": 254, "address": "+63 917 533 0854", "date": 1529632682483, "date_sent": 1529632319000, "read": 1, "status": -1, "type": 1, "body": "Time in ericson", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11092, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529632115549, "date_sent": 1529631995000, "read": 1, "status": -1, "type": 1, "body": "Time in ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11091, "thread_id": 11, "address": "+639175517548", "date": 1529631316184, "date_sent": 1529626161000, "read": 1, "status": -1, "type": 1, "body": "timein:ben", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11090, "thread_id": 8, "address": "+639178523162", "date": 1529631315783, "date_sent": 1529625460000, "read": 1, "status": -1, "type": 1, "body": "Time in bham", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11089, "thread_id": 10, "address": "+63 917 533 0584", "date": 1529631315331, "date_sent": 1529624964000, "read": 1, "status": -1, "type": 1, "body": "Time in:erics0n ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11088, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529631314957, "date_sent": 1529624244000, "read": 1, "status": -1, "type": 1, "body": "TIME IN: jer0me\nJustification: Arrived 656 in store but opening rider arrived 736. ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11087, "thread_id": 254, "address": "+63 917 533 0854", "date": 1529631314665, "date_sent": 1529623326000, "read": 1, "status": -1, "type": 1, "body": "Time in chano", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11086, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529631314242, "date_sent": 1529623114000, "read": 1, "status": -1, "type": 1, "body": "Time in jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }];
        let smsdata = [{ "_id": 11159, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529725445621, "date_sent": 1529725443000, "read": 1, "status": -1, "type": 1, "body": "Time out cris", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11156, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529718602252, "date_sent": 1529718601000, "read": 1, "status": -1, "type": 1, "body": "Time in jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11149, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529709296110, "date_sent": 1529709293000, "read": 1, "status": -1, "type": 1, "body": "TIME IN: cris\nJustification: Arrived 7:03 in store but opening rider arrived 7:14. ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11142, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529708189144, "date_sent": 1529708187000, "read": 1, "status": -1, "type": 1, "body": "Time in jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11130, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529667016270, "date_sent": 1529667008000, "read": 1, "status": -1, "type": 1, "body": "Time out jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11121, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529666040103, "date_sent": 1529666038000, "read": 1, "status": -1, "type": 1, "body": "Time out ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11110, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529651614288, "date_sent": 1529651611000, "read": 1, "status": -1, "type": 1, "body": "Time in jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11103, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529636825533, "date_sent": 1529636823000, "read": 1, "status": -1, "type": 1, "body": "Time 0ut jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11092, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529632115549, "date_sent": 1529631995000, "read": 1, "status": -1, "type": 1, "body": "Time in ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11088, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529631314957, "date_sent": 1529624244000, "read": 1, "status": -1, "type": 1, "body": "TIME IN: jer0me\nJustification: Arrived 656 in store but opening rider arrived 736. ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11086, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529631314242, "date_sent": 1529623114000, "read": 1, "status": -1, "type": 1, "body": "Time in jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11076, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529582889589, "date_sent": 1529582887000, "read": 1, "status": -1, "type": 1, "body": "Time out jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11075, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529582202838, "date_sent": 1529582200000, "read": 1, "status": -1, "type": 1, "body": "Time out cris", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 },
        { "_id": 11061, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529574298213, "date_sent": 1529574296000, "read": 1, "status": -1, "type": 1, "body": "Time0ut-js0n", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11051, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529539386842, "date_sent": 1529539384000, "read": 1, "status": -1, "type": 1, "body": "Timein js0n", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11048, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529537740575, "date_sent": 1529537734000, "read": 1, "status": -1, "type": 1, "body": "TIME IN: cris\nJustification: Arrived 7:02 in store but opening rider arrived 7:36. ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11046, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529536887937, "date_sent": 1529536885000, "read": 1, "status": -1, "type": 1, "body": "Time in jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11025, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529493134883, "date_sent": 1529493133000, "read": 1, "status": -1, "type": 1, "body": "Time out jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11024, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529493098565, "date_sent": 1529493096000, "read": 1, "status": -1, "type": 1, "body": "Time out jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11023, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529492469287, "date_sent": 1529492467000, "read": 1, "status": -1, "type": 1, "body": "Time out cris", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 11019, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529486098135, "date_sent": 1529486095000, "read": 1, "status": -1, "type": 1, "body": "Time out,js0n", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10999, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529457572295, "date_sent": 1529451100000, "read": 1, "status": -1, "type": 1, "body": "TIME IN: cris\nJustification: Arrived 6:50 in store but opening rider arrived 7:34. ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10998, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529457571745, "date_sent": 1529450165000, "read": 1, "status": -1, "type": 1, "body": "Time in jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 },
        { "_id": 10981, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529407055272, "date_sent": 1529407053000, "read": 1, "status": -1, "type": 1, "body": "Time out jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10972, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529406246274, "date_sent": 1529406231000, "read": 1, "status": -1, "type": 1, "body": "Time out cris", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10965, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529399915458, "date_sent": 1529399908000, "read": 1, "status": -1, "type": 1, "body": "Time0ut js0n", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10958, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529395455932, "date_sent": 1529395455000, "read": 1, "status": -1, "type": 1, "body": "Time 0ut jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10955, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529391658744, "date_sent": 1529391656000, "read": 1, "status": -1, "type": 1, "body": "Time in cris", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10952, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529378951903, "date_sent": 1529378634000, "read": 1, "status": -1, "type": 1, "body": "Time out cris", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10944, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529373331077, "date_sent": 1529373325000, "read": 1, "status": -1, "type": 1, "body": "Time in jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10941, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529364409398, "date_sent": 1529364406000, "read": 1, "status": -1, "type": 1, "body": "Timein js0n ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10933, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529362935455, "date_sent": 1529362934000, "read": 1, "status": -1, "type": 1, "body": "TIME IN: cris\nJustification: Arrived 6:55 in store but opening rider arrived 7:05. ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10931, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529361305398, "date_sent": 1529361303000, "read": 1, "status": -1, "type": 1, "body": "Time in jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10901, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529321261585, "date_sent": 1529321259000, "read": 1, "status": -1, "type": 1, "body": "Time out jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 },
        { "_id": 10898, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529320306158, "date_sent": 1529320304000, "read": 1, "status": -1, "type": 1, "body": "Time out cris", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10883, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529309797354, "date_sent": 1529309481000, "read": 1, "status": -1, "type": 1, "body": "Time 0ut jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10879, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529303978073, "date_sent": 1529303975000, "read": 1, "status": -1, "type": 1, "body": "Time in jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10876, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529291556718, "date_sent": 1529291542000, "read": 1, "status": -1, "type": 1, "body": "Time out jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10834, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529234795267, "date_sent": 1529234792000, "read": 1, "status": -1, "type": 1, "body": "Time 0ut jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10829, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529233941931, "date_sent": 1529233939000, "read": 1, "status": -1, "type": 1, "body": "Time out cris", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10777, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529223401779, "date_sent": 1529223088000, "read": 1, "status": -1, "type": 1, "body": "Time out jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10769, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529218577719, "date_sent": 1529218572000, "read": 1, "status": -1, "type": 1, "body": "Time in jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10755, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529205221629, "date_sent": 1529205042000, "read": 1, "status": -1, "type": 1, "body": "Time 0ut jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10750, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529198893657, "date_sent": 1529198892000, "read": 1, "status": -1, "type": 1, "body": "Time in cris", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10747, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529192150189, "date_sent": 1529191830000, "read": 1, "status": -1, "type": 1, "body": "TIME IN: jer0me\nJustification: Arrived 705in store but opening rider arrived 719. ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10742, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529190224983, "date_sent": 1529190222000, "read": 1, "status": -1, "type": 1, "body": "Time in jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 },
        { "_id": 10714, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529148419871, "date_sent": 1529148420000, "read": 1, "status": -1, "type": 1, "body": "Time out jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10711, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529147483546, "date_sent": 1529147483000, "read": 1, "status": -1, "type": 1, "body": "Time out ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10701, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529138120218, "date_sent": 1529138117000, "read": 1, "status": -1, "type": 1, "body": "Time 0ut jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10695, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529132854897, "date_sent": 1529132854000, "read": 1, "status": -1, "type": 1, "body": "Time in ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10685, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529118369126, "date_sent": 1529118369000, "read": 1, "status": -1, "type": 1, "body": "Time out ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10678, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529114005089, "date_sent": 1529114003000, "read": 1, "status": -1, "type": 1, "body": "Time in jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10677, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529104641176, "date_sent": 1529104639000, "read": 1, "status": -1, "type": 1, "body": "Time in ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10669, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529102828162, "date_sent": 1529102824000, "read": 1, "status": -1, "type": 1, "body": "Time in jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10655, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529061988388, "date_sent": 1529061981000, "read": 1, "status": -1, "type": 1, "body": "Time out jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10651, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529061225383, "date_sent": 1529061223000, "read": 1, "status": -1, "type": 1, "body": "Time out ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10650, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529061176773, "date_sent": 1529061168000, "read": 1, "status": -1, "type": 1, "body": "Time out ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10627, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529051501741, "date_sent": 1529051498000, "read": 1, "status": -1, "type": 1, "body": "Time out jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10611, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529031767262, "date_sent": 1529031766000, "read": 1, "status": -1, "type": 1, "body": "Time 0ut jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 },
        { "_id": 10610, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529028509627, "date_sent": 1529028508000, "read": 1, "status": -1, "type": 1, "body": "Time in ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10601, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529018791914, "date_sent": 1529018791000, "read": 1, "status": -1, "type": 1, "body": "TIME IN: jer0me\nJustification: Arrived 700 in store but opening rider arrived 726. ", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10596, "thread_id": 9, "address": "(0917) 852 5794", "date": 1529017276301, "date_sent": 1529017275000, "read": 1, "status": -1, "type": 1, "body": "Time in jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10586, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528976753792, "date_sent": 1528976443000, "read": 1, "status": -1, "type": 1, "body": "Time out jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10581, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528975514050, "date_sent": 1528975511000, "read": 1, "status": -1, "type": 1, "body": "Time out ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10571, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528963489817, "date_sent": 1528963486000, "read": 1, "status": -1, "type": 1, "body": "Time 0ut jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10568, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528959682972, "date_sent": 1528959682000, "read": 1, "status": -1, "type": 1, "body": "Time in ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10564, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528945638435, "date_sent": 1528945405000, "read": 1, "status": -1, "type": 1, "body": "Time out ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10560, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528941199461, "date_sent": 1528941197000, "read": 1, "status": -1, "type": 1, "body": "Time in jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 },
        { "_id": 10555, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528931949755, "date_sent": 1528931947000, "read": 1, "status": -1, "type": 1, "body": "Time in ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10547, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528929957774, "date_sent": 1528929956000, "read": 1, "status": -1, "type": 1, "body": "Time in jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10515, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528888524432, "date_sent": 1528888522000, "read": 1, "status": -1, "type": 1, "body": "Time out jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10512, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528887983179, "date_sent": 1528887827000, "read": 1, "status": -1, "type": 1, "body": "Time out ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10506, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528879315866, "date_sent": 1528879313000, "read": 1, "status": -1, "type": 1, "body": "Time out angelo", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10501, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528874070039, "date_sent": 1528874068000, "read": 1, "status": -1, "type": 1, "body": "Time in ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10494, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528859746610, "date_sent": 1528859742000, "read": 1, "status": -1, "type": 1, "body": "Time  out ems", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10489, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528854382209, "date_sent": 1528854380000, "read": 1, "status": -1, "type": 1, "body": "Time  in jer0me", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 },
        { "_id": 10486, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528846124920, "date_sent": 1528846123000, "read": 1, "status": -1, "type": 1, "body": "Time in ems\nJustification:mdjo mkulog pa po kaya payo q .", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10464, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528802175024, "date_sent": 1528802167000, "read": 1, "status": -1, "type": 1, "body": "Timeout jeff", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }, { "_id": 10454, "thread_id": 9, "address": "(0917) 852 5794", "date": 1528801193279, "date_sent": 1528801191000, "read": 1, "status": -1, "type": 1, "body": "Timeout:ben", "service_center": "+639170000299", "locked": 0, "sub_id": 3, "error_code": 0, "creator": "com.textra", "seen": 0, "priority": -1 }];

        this.processSMS(smsdata);
    }

    generateReport() { //generate all
        this.processSMS();
    }

    generateLeg1Report() {
        var mobile = '+639178523162';
        this.processSMS(mobile);
    }
    generateLeg2Report() {
        var mobile = '+639178525794';
        this.processSMS(mobile);
    }
    generateDrgReport() {
        var mobile = '+639175517548';
        this.processSMS(mobile);
    }
    generateOasReport() {
        var mobile = '+639175330584';
        this.processSMS(mobile);
    }
    generateGuinobatanReport() {
        var mobile = '+639178385603';
        this.processSMS(mobile);
    }
    generateLigaoReport() {
        var mobile = '+639175330854';
        this.processSMS(mobile);
    }

    checkPermission(mobile = '') {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
            success => {

                //if permission granted
                // this.ReadSMSList(mobile);
            },
            err => {

                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).
                    then(success => {
                        // this.ReadSMSList(mobile);
                    },
                        err => {
                            alert("cancelled")
                        });
            });

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

    }

    ReadSMSList(mobile = '') { //default read all
        this.platform.ready().then((readySource) => {
            const loading = this.loadingCtrl.create();
            loading.present().then(() => {
                let filter = {
                    box: 'inbox', // 'inbox' (default), 'sent', 'draft'
                    indexFrom: 0, // start from index 0
                    maxCount: this.noOfMsgsToFetch, // count of SMS to return each time
                    address: mobile,
                };

                if (SMS) SMS.listSMS(filter, (ListSms) => {
                    this.messages = ListSms;

                    this.rawdata = ListSms.filter(function (item) {
                        return (item.body.toLowerCase().substr(0, 4) == 'time');
                    });

                    //this.processSMS(smsdata);

                },
                    Error => {
                        alert(JSON.stringify(Error))
                    });

                loading.dismiss();
            });
        });
    }

    processSMS(smsdata = this.rawdata) {
        if (smsdata.length == 0) {
            //no data - no processing
        }
        else {
            const loading = this.loadingCtrl.create();
            loading.present().then(() => {
                //first step filtering - filter by startdate and enddate and mobile
                let startDate = new Date(this.startDate),
                    endDate = new Date(this.endDate),
                    mobile = this.mobile;
                let result: any = $.map(smsdata, function (item, i) {
                    let date = new Date(item.date_sent),
                        day = date.getDate(),
                        month = date.getMonth() + 1,
                        year = date.getFullYear(),
                        hour = date.getHours(),
                        minute = date.getMinutes(),
                        fulldate = month + '/' + day + '/' + year,
                        time = hour + ':' + minute,
                        fulldatetime = new Date(fulldate + ' ' + time);

                    if (fulldatetime > startDate && fulldatetime < endDate) {
                        if (mobile != '') {

                            let itemMobile = item.mobile.replace(/[() ]/gm, ' ').trim();
                            if (mobile == itemMobile) {
                                return item;
                            }
                        }
                        else {
                            return item;
                        }
                    }

                });

                //processing of data
                result = $.map(result, function (item, i) {
                    let date = new Date(item.date_sent),
                        day = date.getDate(),
                        month = date.getMonth() + 1,
                        year = date.getFullYear(),
                        hour = date.getHours(),
                        minute = date.getMinutes(),
                        fulldate = month + '/' + day + '/' + year,
                        time = hour + ':' + minute,
                        fulldatetime = fulldate + ' ' + time,
                        prefix = item.body.substr(0, 6),//get first 6 chars
                        activity;

                    prefix = prefix.toLowerCase().replace(/ /g, '').substr(0, 5);//remove space and get 5 chars

                    if (prefix == 'timei') {
                        activity = 'IN';
                    }
                    else if (prefix == 'timeo' || prefix == 'time0') {
                        activity = 'OUT'
                    }

                    //get name
                    var msg = '';
                    let filteredMsg = item.body.replace(/[!@#$%^&~*()_+\-=\[\]{};\':"\\|,.<>?]/gm, ' ').trim();
                    if (item.body.toLowerCase().indexOf('justification') > 0) {
                        msg = filteredMsg.substr(0, filteredMsg.toLowerCase().indexOf('justification')).split(' ');
                    }
                    else {
                        msg = filteredMsg.split(' ');
                    }
                    var name = msg[msg.length - 1].replace(/0/gm, 'o').trim().toLowerCase();

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
                            branch = 'leg1';
                            break;
                        case '(0917) 852 5794':
                        case '+639178525794':
                            branch = 'leg2';
                            break;
                        case '+639175517548':
                            branch = 'drg';
                            break;
                        case '+63 917 533 0584':
                        case '+639175330584':
                            branch = 'oas';
                            break;
                        case '+63 917 838 5603':
                        case '+639178385603':
                            branch = 'guinobatan';
                            break;
                        case '+63 917 533 0854':
                        case '+639175330854':
                            branch = 'ligao';
                            break;
                    }

                    return {
                        branch: branch,
                        address: item.address,
                        activity: activity,
                        name: name,
                        fulldatetime: fulldatetime,
                        date: fulldate,
                        early: early,

                        late: late,

                        overtime: overtime,
                        sched: sched.getHours() + '00',
                        justification: justification
                    };
                });

                //process multiple users split by slash
                result.forEach((element, index) => {
                    let splitusers: any;
                    if (element.name.indexOf('/') > 0) {
                        splitusers = element.name.split('/');
                        result.splice(index, 1);//remove current item with multiple users and insert 2 new records
                        splitusers.forEach(splituser => {
                            result.splice(index, 0,
                                {
                                    branch: element.branch,
                                    address: element.address,
                                    activity: element.activity,
                                    name: splituser,
                                    fulldatetime: element.fulldatetime,
                                    date: element.date,
                                    early: element.early,

                                    late: element.late,

                                    overtime: element.overtime,
                                    sched: element.sched,
                                    justification: element.justification
                                });
                        });
                    }
                });

                this.rawdataJson = JSON.stringify(this.rawdata);
                this.finalProcessedData = JSON.stringify(result); //processed data json
                // this.timelogs = result;

                //reset
                this.uniqueUsers = [];

                //save unique users 
                result.forEach(item => {
                    let exists = false;

                    //add single user
                    this.uniqueUsers.forEach(element => {
                        if (item.name == element.name) {
                            //don't insert
                            exists = true;
                            return;
                        }
                    });

                    if (!exists) {
                        this.uniqueUsers.push({
                            branch: item.branch,
                            address: item.address,
                            name: item.name,
                            early: 0,
                            earlyBird: 0,
                            late: 0,
                            lateMemo: 0,
                            overtime: 0,
                            attendance: 1,
                            timelogs: []
                        });
                    }
                });

                //sum up
                this.uniqueUsers.forEach(item => {
                    result.forEach(element => {
                        if (item.name == element.name) {
                            item.early += element.early;
                            //threshold only sum if more than 15m
                            if (element.late > 10)
                                item.late += element.late;
                            //threshold only sum if more than 15m
                            if (element.overtime > 15)
                                item.overtime += element.overtime;
                            //save all allogs
                            item.timelogs.push(element);
                        }
                    });
                });

                //count attendance
                this.uniqueUsers.forEach(item => {
                    let dateholder = item.timelogs[0].date;
                    item.timelogs.forEach(element => {
                        if (dateholder != element.date) {
                            item.attendance += 1;
                            dateholder = element.date;
                        }
                    });

                    //calculate earlybird reward
                    item.earlyBirdReward = Math.floor(item.early / 200);
                    // item.earlyBirdReward = Math.floor(item.early / 10); // test

                    //calculate late memo
                    //threshold attendance 50m
                    item.lateMemo = Math.floor(item.late / 50);
                    // item.lateMemo = Math.floor(item.late / 10); //test

                });

                // this.uniqueUsersRaw = JSON.stringify(this.uniqueUsers);
                
                if(this.uniqueUsers.length==0){
                    this.noData = true; 
                }
                else{
                    this.reportGenerated = true;
                }
                    

                loading.dismiss();
            });
        }
    }

}
