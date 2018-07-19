import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
declare let SMS: any;
import { AndroidPermissions } from '@ionic-native/android-permissions';
import * as $ from 'jquery'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    build = 'dev';
    // build = 'prod';

    //filters
    noOfMsgsToFetch = 200;
    lateThreshold = 5; //mins
    tempdate = new Date();
    startDate = new Date(this.tempdate.getFullYear(), this.tempdate.getMonth(), 1).toISOString();
    endDate = new Date().toISOString();
    mobile = '';

    excludeJustification = false;

    noData = false;
    reportGenerated = false;
    finalProcessedData;
    rawdata;
    rawdataJson;
    messages: any = [];
    timelogs: any = [];
    summaryReport: any = [];
    uniqueUsers: any = [];
    uniqueUsersRaw: any = [];

    salesLogs: any = [];
    salesLogsJson: any = [];

    constructor(public platform: Platform, public androidPermissions: AndroidPermissions, private loadingCtrl: LoadingController) {
        if (this.build == 'prod') {
            this.checkPermission();
        }
    }

    ionViewDidLoad() {
        //deploy
        if (this.build == 'prod') {
            this.ReadSMSList();
        }

        //dev test
        if (this.build == 'dev') {
            this.getData();
        }
    }

    //helper for looping in front end
    getNumber = function (num) {
        return new Array(num);
    }

    getData() {
        this.mobile = '';
        //for testing only
        this.rawdata = [
            {
                "_id": 12668,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531989201480,
                "date_sent": 1531989196000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "Time out.chano",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12667,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531987607093,
                "date_sent": 1531987603000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "time out angelo",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12666,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531987387030,
                "date_sent": 1531987383000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:bot",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12665,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531987383255,
                "date_sent": 1531987381000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time 0ut jer0me",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12664,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531984293453,
                "date_sent": 1531984290000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in cris",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12663,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531983658790,
                "date_sent": 1531983654000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "timein:ben",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12661,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531982256700,
                "date_sent": 1531982253000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in:melvin",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12660,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531970199410,
                "date_sent": 1531970197000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:melvin",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12659,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531969883515,
                "date_sent": 1531969879000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out cris",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12658,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531969636968,
                "date_sent": 1531969634000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "timeout:ben",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12655,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531965414349,
                "date_sent": 1531965403000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "Time in:ericson",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12654,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531965214229,
                "date_sent": 1531965210000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in jeff",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12649,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531959230257,
                "date_sent": 1531959218000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Leg1 sales\nJul18\n2.7kg-2\n5kg-2\n11kg-37\n22kg-\n50kg-2\n330g-8\nGasliteset-\nGrillerset-\nNoa-2(11kg)\nC0mbined-32(50kg)\nMelvin-9(11kg) \nBot-23(11kg) \nBham-  5\nBank~jul17(22632) jul16(32341) les c/o sir athan(30000) total deposit=24973\nC0h~35418",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12648,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531958837120,
                "date_sent": 1531958833000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in \"bham\"",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12647,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531958742941,
                "date_sent": 1531958739000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time in ems",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12646,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531956856074,
                "date_sent": 1531956845000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": " \n\nOas sales\nJul18\n2.7kg-3\n5kg-2\n11kg-55\n22kg-\n50kg-\n330g-3\nNoa-2-11kg capt/sold\nRR-\nErecson-\nC-\nWalk in-\nbank-                    jul17-26,692\njul18-15,000\ntotal-41,692\nCOH-23,773",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12645,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531956072534,
                "date_sent": 1531956067000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "timein:ben",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12644,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531955678593,
                "date_sent": 1531955356000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "Time in bryan",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12643,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531955677385,
                "date_sent": 1531955247000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME IN :RR ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12642,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531955676174,
                "date_sent": 1531955053000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "Time in chano",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12641,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531955675025,
                "date_sent": 1531955030000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "Time in edsel",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12640,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531955673889,
                "date_sent": 1531954884000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "Time in:paul",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12639,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531955672671,
                "date_sent": 1531954818000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in cris",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12638,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531955671638,
                "date_sent": 1531954792000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME IN :mark  ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12637,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531953787737,
                "date_sent": 1531953783000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in \"melvin\"",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12636,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531953731742,
                "date_sent": 1531953727000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in jer0me",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12635,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531953713632,
                "date_sent": 1531953709000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in \"melvin\"",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12634,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531952255640,
                "date_sent": 1531952252000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time in angelo",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12633,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531952159815,
                "date_sent": 1531952157000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in \"b0t\"",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12623,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531913652568,
                "date_sent": 1531913649000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out jeff",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12622,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531913541610,
                "date_sent": 1531913537000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time out:eman",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12621,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531913335019,
                "date_sent": 1531913332000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "Time out edsel",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12620,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531913308397,
                "date_sent": 1531913306000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "Time out christian",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12619,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531913279927,
                "date_sent": 1531913271000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "Magandang gabi\nGbtn sales \nJuly 18 \n\n2.7kg-9\n5kg-1\n11kg-20\n22kg-\n50kg-\nGazlite refill-17\nGazlite set-\nNOA-1\nFor pickup-(july16 completion)25,320(july17 completion)21,269(july18 completion)180,21\nBank-\nCOH-64,610 \n\nedsel-5\nbryan-7\ncombined-4\nwalk in-4\n11kg filled-59\n11kg empty-11\n\nThankyou ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12618,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531913015041,
                "date_sent": 1531913013000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:bham/bot",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12617,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531912801123,
                "date_sent": 1531912798000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out jer0me",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12616,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531912768286,
                "date_sent": 1531912764000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out cris",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12615,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531912669321,
                "date_sent": 1531912661000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Magandang gabi\nLeg2 sales\n\n2.7kg-1\n5kg-\n11kg-22\n22kg-2\n50kg-\nGazlite refill-4\nGazlite set-\nNOA-1 angelo\nBank-july17 11999, july18 7911\nCOH-50139\n \nJerome:10(11kg)1(22kg)\nJef:12(11kg)1(22kg)\n\nThanky0u",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12614,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531912546675,
                "date_sent": 1531912537000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Leg1 sales\nJul18\n2.7kg-2\n5kg-2\n11kg-36\n22kg-\n50kg-2\n330g-8\nGasliteset-\nGrillerset-\nNoa-2(11kg)\nC0mbined-32(50kg)\nMelvin-9(11kg) \nBot-23(11kg) \nBham-  5\nBank~jul17(22632) jul16(32341) les c/o sir athan(30000) total deposit=24973\nC0h~35418",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12613,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531912487120,
                "date_sent": 1531912483000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time out ems",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12612,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531912257424,
                "date_sent": 1531912253000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Magandanggabi\nDARAGA sales\n\n2.7kg-1\n5kg~1\n11kg~28\n22kg~1\n50kg-8\nGazlite refill-3\nGazlite set~\nNOA-\nBank-32017july17\nCOH-22479\nThanky0u ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12611,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531911840084,
                "date_sent": 1531911835000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME OUT:mark \n\n Time out:ericson ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12610,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531911761990,
                "date_sent": 1531911758000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "Time out.chano",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12609,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531911700242,
                "date_sent": 1531911698000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "Time out.chano",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12608,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531911557007,
                "date_sent": 1531911547000,
                "read": 0,
                "status": -1,
                "type": 1,
                "body": "LIGAO sales\nJULY-18\n2.7kg-\n5kg-2\n11kg-40\n22kg-\n50kg-3\n330gm-28\ncanisteR-\nGasliteset-\nGrillerset-\nERICS0N-13(1-50kg)\nCHANO-14(2-50kg)\nWALK IN-13\nBank\nJuly 17-37,202\nCOH-32,464",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12604,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531906572643,
                "date_sent": 1531906569000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:ericson",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12603,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531905553141,
                "date_sent": 1531905549000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out angelo",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12601,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531902369369,
                "date_sent": 1531902365000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out bryan",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12600,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531902128623,
                "date_sent": 1531902126000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out: melvin",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12599,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531902050860,
                "date_sent": 1531902048000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "timeout:ben",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12598,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531900434831,
                "date_sent": 1531900431000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in jeff",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12594,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531897113744,
                "date_sent": 1531897110000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time in:eman",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12593,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531893978504,
                "date_sent": 1531893974000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in:bot",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12592,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531887088142,
                "date_sent": 1531887086000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out jeff",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12591,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531886840406,
                "date_sent": 1531886838000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time out eman",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12590,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531882857181,
                "date_sent": 1531882854000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:bot",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12589,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531878544112,
                "date_sent": 1531878541000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in edsel",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12588,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531878430776,
                "date_sent": 1531878427000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in cris",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12587,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531878104742,
                "date_sent": 1531878096000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in chano",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12586,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531873267736,
                "date_sent": 1531872337000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in bham",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12584,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531873264256,
                "date_sent": 1531872167000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time in ems",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12583,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531871625991,
                "date_sent": 1531871609000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in angelo",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12582,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531871264836,
                "date_sent": 1531871260000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME IN: jeff\nJustification: mrning sir/ma,am naraotan po ako. Ty po. ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12579,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531871144743,
                "date_sent": 1531870120000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time in:eman arrive at 7:10 but the opening rider arrive 7:25.",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12578,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531871142633,
                "date_sent": 1531869138000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in:erics0n ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12577,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531871141444,
                "date_sent": 1531869118000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in bryan",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12576,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531871140257,
                "date_sent": 1531869109000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME IN :mark  ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12575,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531871138383,
                "date_sent": 1531868933000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in christian",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12574,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531871136744,
                "date_sent": 1531868761000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "timein:ben",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12573,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531871134850,
                "date_sent": 1531868318000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in:ericson",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12572,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531871132004,
                "date_sent": 1531868299000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in:paul",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12571,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531871129922,
                "date_sent": 1531867892000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in \"melvin\"",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12570,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531871128752,
                "date_sent": 1531867880000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in jer0me",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12569,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531871127803,
                "date_sent": 1531865706000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in \"b0t\"",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12568,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531830350422,
                "date_sent": 1531830346000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time0ut js0n",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12567,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531829521459,
                "date_sent": 1531829517000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "timeout:ben",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12566,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531829490066,
                "date_sent": 1531829483000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Magandanggabi\nDARAGA sales\n\n2.7kg-4\n5kg~1\n11kg~33\n22kg~1\n50kg-\nGazlite refill-17\nGazlite set~\nNOA-1\nBank-july16~17859     \nCOH-44805\nThanky0u ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12565,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531827290864,
                "date_sent": 1531827287000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out jeff",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12564,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531826253862,
                "date_sent": 1531826250000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:bham/melvin",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12563,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531826232635,
                "date_sent": 1531826228000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out cris",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12562,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531826200544,
                "date_sent": 1531826190000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Magandang gabi\nLeg2 sales\n\n2.7kg-5\n5kg-2\n11kg-32\n22kg-2\n50kg-\nGazlite refill-2\nGazlite set-\nNOA-\nBank-jul16 19594.75, jul17 15854\nCOH-11999\n \nJerome:10\nJef:12(11kg)1(22kg)\nCombined:5(11kg)1(22kg)\nWalkin:5\n\n\nThanky0u",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12561,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531826093716,
                "date_sent": 1531826090000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out bryan",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12560,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531826077067,
                "date_sent": 1531826067000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Leg1 sales\nJul17\n2.7kg-\n5kg-\n11kg-32\n22kg-\n50kg-\n330g-4\nGasliteset-\nGrillerset-\nNoa-\nC0mbined-9(11kg)\nMelvin-11(11kg) \nBot-12(11kg) \nBham-  \nBank~\nC0h~jul16(32,341) jul17(22632)",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12559,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531826058597,
                "date_sent": 1531826054000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out christian",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12558,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531826014502,
                "date_sent": 1531826005000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Magandang gabi\nGbtn sales \nJuly 17 \n\n2.7kg-\n5kg-2\n11kg-26\n22kg-\n50kg-\nGazlite refill-20\nGazlite set-\nNOA-\nFor pickup-(july16 completion)25,320(july17 completion)21,269\nBank-\nCOH-46,589 \n\nbryan-20\nwalk in-6\n11kg filled-24\n11kg empty-47\n\nThankyou ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12557,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531825817216,
                "date_sent": 1531825814000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:ericson",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12556,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531825792063,
                "date_sent": 1531825788000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out.chano",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12555,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531825753417,
                "date_sent": 1531825743000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "LIGAO sales\nJULY-17\n2.7kg-10\n5kg-2\n11kg-44\n22kg-\n50kg-\n330gm-18\ncanisteR-\nGasliteset-\nGrillerset-\nERICS0N-3\nCHANO-32-\nWALK IN-9(eric)\nBank-\nJuly 16-40,574\nCOH-37,202",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12554,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531825167534,
                "date_sent": 1531825165000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME OUT:RR  ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12553,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531825129126,
                "date_sent": 1531825125000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME OUT:mark ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12552,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531825003814,
                "date_sent": 1531824993000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": " \n\nOas sales\nJul17\n2.7kg-5\n5kg-1\n11kg-44\n22kg-\n50kg-2\n330g-9\nNoa-3-11kg capt\nRR-\nErecson-\nC-\nWalk in-\nbank-                    jul16-20,703\njul17-15,500\ntotal-36,203\nCOH-26,692",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12550,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531814886115,
                "date_sent": 1531814882000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time out:eman",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12549,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531814611917,
                "date_sent": 1531814608000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time 0ut jer0me",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12548,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531814523641,
                "date_sent": 1531814519000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out: bot",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12547,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531810777206,
                "date_sent": 1531810773000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "timein js0n",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12546,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531810699613,
                "date_sent": 1531810695000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in cris",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12545,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531810304522,
                "date_sent": 1531810300000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in melvin",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12543,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531800203078,
                "date_sent": 1531800197000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time0ut:js0n",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12542,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531797063727,
                "date_sent": 1531797060000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out cris",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12541,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531796581487,
                "date_sent": 1531796578000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out melvin",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12540,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531792328261,
                "date_sent": 1531792324000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME IN :mark  ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12539,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531791495484,
                "date_sent": 1531791491000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in jeff",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12538,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531786069799,
                "date_sent": 1531786066000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in bham",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12537,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531786019036,
                "date_sent": 1531786015000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "timein:ben",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12536,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531784864283,
                "date_sent": 1531784860000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME IN: js0n\nJustification: Arrived 6:50am in store but opening rider arrived 7:46. ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12535,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531783498130,
                "date_sent": 1531783494000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time in:eman",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12534,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531782896063,
                "date_sent": 1531782892000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in bryan",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12533,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531782502442,
                "date_sent": 1531782496000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in christian",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12532,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531782440231,
                "date_sent": 1531782436000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME IN :RR ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12531,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531782421234,
                "date_sent": 1531782410000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in:erics0n ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12530,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531782260188,
                "date_sent": 1531782255000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in chano",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12529,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531782246753,
                "date_sent": 1531782242000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in:ericson",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12527,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531781955789,
                "date_sent": 1531781955000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in cris",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12524,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531781883165,
                "date_sent": 1531781563000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in \"melvin\"",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12523,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531781001867,
                "date_sent": 1531780994000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in jer0me",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12522,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531779274311,
                "date_sent": 1531779270000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in \"b0t\"",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12521,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531742012961,
                "date_sent": 1531742011000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time out:eman",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12520,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531740860393,
                "date_sent": 1531740776000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:bham/angelo",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12519,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531740744004,
                "date_sent": 1531740734000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Leg1 sales\nJul16\n2.7kg-2\n5kg-1\n11kg-30\n22kg-1\n50kg-2\n330g-1\nGasliteset-\nGrillerset-\nNoa-1(11kg) \nC0mbined-\nMelvin-21(11kg)1(50kg) 1(22kg) \nAngelo-4(11kg) 1 \nBham-5  \nBank~jul14(31613) jul15(16524)\nCoh-32341",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12518,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531740577278,
                "date_sent": 1531740575000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time out ems",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12517,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531740566355,
                "date_sent": 1531740563000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out christian",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12516,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531740532474,
                "date_sent": 1531740525000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out bryan",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12515,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531740531354,
                "date_sent": 1531740513000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Magandanggabi\nDARAGA sales\n\n2.7kg-2\n5kg~2\n11kg~29\n22kg~1\n50kg-1\nGazlite refill-13\nGazlite set~\nNOA-\nBank-14389july13  30456july14  14558july15 \nCOH-17859\nThanky0u ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12514,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531740495568,
                "date_sent": 1531740484000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Magandang gabi\nGbtn sales \nJuly 16 \n\n2.7kg-9\n5kg-2\n11kg-24\n22kg-\n50kg-\nGazlite refill-16\nGazlite set-1\nNOA-1\nPickup-(july14 completion)30,585(july15 completion)23,369\nFor pickup-(july16 completion)25,320\nBank-\nCOH-25,320 \n\nbryan-17\nwalk in-7\n11kg filled-50\n11kg empty-21\n\nThankyou ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12513,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531740332303,
                "date_sent": 1531740319000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out jer0me",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12512,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531740254394,
                "date_sent": 1531740226000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:ericson",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12511,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531740229486,
                "date_sent": 1531740200000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:paul",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12510,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531740108722,
                "date_sent": 1531740100000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "LIGAO sales\nJULY-16\n2.7kg-6\n5kg-\n11kg-51\n22kg-1\n50kg-\n330gm-12\ncanister-\nGasliteset-\nGrillerset-\nERICS0N-14\nCHANO-20/1-22kg\nWALK IN-17\nBank-\nJuly 14-35,203\nJuly 15-28,797\nTotal=64,000\nCOH-40,574",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12509,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531739546446,
                "date_sent": 1531739543000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out cris",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12508,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531739520675,
                "date_sent": 1531739511000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Magandang gabi\nLeg2 sales\n\n2.7kg-1\n5kg-\n11kg-23\n22kg-\n50kg-1\nGazlite refill-6\nGazlite set-\nNOA-\nBank-jul14 6969, jul15 11851\nCOH-19594.75\n \nJerome:5\nJef:16(11kg)1(50kg)\nWalkin:2\nThanky0u",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12507,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531738786392,
                "date_sent": 1531738783000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME OUT:mark \n\n Time out:ericson ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12506,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531738612968,
                "date_sent": 1531738603000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": " \n\nOas sales\nJul16\n2.7kg-\n5kg-1\n11kg-28\n22kg-1\n50kg-\n330g-6\nNoa-1-11kg capt\nRR-\nErecson-\nC-\nWalk in-\nbank-                    jul14-30,684\njul15-30,253\ntotal-60,937\nCOH-20,703",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12505,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531729805082,
                "date_sent": 1531729801000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out jeff",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12504,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531729598391,
                "date_sent": 1531729593000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out.chano",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12503,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531729462137,
                "date_sent": 1531729457000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in jerome",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12502,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531729116084,
                "date_sent": 1531729112000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time0ut js0n ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12500,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531728858496,
                "date_sent": 1531728855000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME OUT:RR  ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12499,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531728270159,
                "date_sent": 1531728267000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out melvin",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12495,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531724808344,
                "date_sent": 1531724613000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in angelo ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12487,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531713606709,
                "date_sent": 1531713603000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time 0ut jer0me",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12486,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531710691058,
                "date_sent": 1531710686000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out angelo",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12485,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531710623478,
                "date_sent": 1531710620000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time out:eman",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12482,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531707566589,
                "date_sent": 1531707562000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time in ems",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12480,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531706648221,
                "date_sent": 1531706329000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in cris",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12479,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531706148109,
                "date_sent": 1531706145000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in:erics0n ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12478,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531705849482,
                "date_sent": 1531705846000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in:ericson",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12477,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531699592417,
                "date_sent": 1531699274000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in:bham",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12476,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531697688493,
                "date_sent": 1531697678000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME IN: jer0me\nJustification: Arrived 650 in store but opening rider arrived 732. ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12475,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531697284385,
                "date_sent": 1531697279000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time in:eman arrive at 7:05 but the opening rider arrives 7:28",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12474,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531697031853,
                "date_sent": 1531696712000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME IN: jeff\nJustification:mrning po ma,am /sir naplatan po ako po. Ty. ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12473,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531696554407,
                "date_sent": 1531696548000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in christian",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12472,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531696552890,
                "date_sent": 1531696513000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in bryan",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12471,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531696187985,
                "date_sent": 1531696183000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "timein js0n",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12470,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531696067769,
                "date_sent": 1531696048000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME IN :RR ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12469,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531696052730,
                "date_sent": 1531696047000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in chano",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12468,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531695820751,
                "date_sent": 1531695814000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME IN :mark  ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12467,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531695681655,
                "date_sent": 1531695677000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in:paul",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12465,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531694936697,
                "date_sent": 1531694930000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in melvin\"",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12464,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531694934358,
                "date_sent": 1531694527000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time in angelo ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12462,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531692807828,
                "date_sent": 1531653999000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time 0ut jeff",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12461,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531692805947,
                "date_sent": 1531653635000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time out:eman",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12460,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531692803760,
                "date_sent": 1531653338000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time 0ut jer0me",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12459,
                "thread_id": 9,
                "address": "(0917) 852 5794",
                "date": 1531692801042,
                "date_sent": 1531653232000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Magandang gabi\nLeg2 sales\n\n2.7kg-2\n5kg-\n11kg-19\n22kg-1\n50kg-1\nGazlite refill-\nGazlite set-\nNOA-\nBank-\nCOH-11851\n \nJerome:\nJef:19\n\nThanky0u",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12458,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531692797730,
                "date_sent": 1531653185000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out bryan",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12457,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531653176878,
                "date_sent": 1531653163000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out chan",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12456,
                "thread_id": 255,
                "address": "+63 917 838 5603",
                "date": 1531653175287,
                "date_sent": 1531653131000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Magandang gabi\nGbtn sales \nJuly 15 \n\n2.7kg-7\n5kg-\n11kg-31\n22kg-\n50kg-\nGazlite refill-19\nGazlite set-\nNOA-\nFor pickup-(july14 completion)30,585(july15 completion)23,369\nBank-\nCOH-53,954  \n\nbryan-24\nwalk in-7\n11kg filled-24\n11kg empty-48\n\nThankyou ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12455,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531652915062,
                "date_sent": 1531652903000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:bham/angelo",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12454,
                "thread_id": 8,
                "address": "+639178523162",
                "date": 1531652913919,
                "date_sent": 1531652822000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Leg1 sales\nJul15\n2.7kg-3\n5kg-1\n11kg-31\n22kg-\n50kg-1\n330g-3\nGasliteset-\nGrillerset-\nNoa-1(11kg) 1(50kg)\nC0mbined-3(11kg) 1(50kg)\nMelvin-23(11kg) \nAngelo-5(11kg) \nBham-  \nBank~\nC0h~jul14(31613) jul15(16524)",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12453,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531652909418,
                "date_sent": 1531652630000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out.chano",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12452,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531652907591,
                "date_sent": 1531652607000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:paul",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12451,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531652596816,
                "date_sent": 1531652585000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time out ems",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12450,
                "thread_id": 254,
                "address": "+63 917 533 0854",
                "date": 1531652594252,
                "date_sent": 1531652582000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "LIGAO sales\nJULY-15\n2.7kg-7\n5kg-\n11kg-43\n22kg-\n50kg-\n330gm-16\ncanister-\nGasliteset-1\nGrillerset-\nERICS0N-\nCHANO-28\nWALK IN-15\nBank-\nCOH-64,000",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12449,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531652587884,
                "date_sent": 1531652535000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Magandanggabi\nDARAGA sales\n\n2.7kg-2\n5kg~1\n11kg~23\n22kg~\n50kg-1\nGazlite refill-5\nGazlite set-\nNOA-\nBank- \nCOH-14558\nThanky0u ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12448,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531652442994,
                "date_sent": 1531652439000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME OUT:RR  ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12447,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531652417287,
                "date_sent": 1531652408000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "TIME OUT:mark ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12446,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531652416187,
                "date_sent": 1531652306000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": " \n\nOas sales\nJul15\n2.7kg-7\n5kg-\n11kg-37\n22kg-\n50kg-2\n330g-6\nNoa-1-11kg sold 1-11kg capt\nRR-\nErecson-\nC-\nWalk in-\nbank-                    COH-30,253",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12445,
                "thread_id": 10,
                "address": "+63 917 533 0584",
                "date": 1531643635560,
                "date_sent": 1531643318000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "Time out:erics0n ",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            },
            {
                "_id": 12444,
                "thread_id": 11,
                "address": "+639175517548",
                "date": 1531643634548,
                "date_sent": 1531642420000,
                "read": 1,
                "status": -1,
                "type": 1,
                "body": "time0ut js0n",
                "service_center": "+639170000299",
                "locked": 0,
                "sub_id": 3,
                "error_code": 0,
                "creator": "com.textra",
                "seen": 0,
                "priority": -1
            }
        ];

        this.processSMS();
    }

    generateReport() { //generate all
        this.mobile = '';
        this.processSMS();
    }

    generateLeg1Report() {
        this.mobile = '9178523162';
        this.processSMS();
    }
    generateLeg2Report() {
        this.mobile = '9178525794';
        this.processSMS();
    }
    generateDrgReport() {
        this.mobile = '9175517548';
        this.processSMS();
    }
    generateOasReport() {
        this.mobile = '9175330584';
        this.processSMS();
    }
    generateGuinobatanReport() {
        this.mobile = '9178385603';
        this.processSMS();
    }
    generateLigaoReport() {
        this.mobile = '9175330854';
        this.processSMS();
    }

    sendReportDataToEmail() {
        //code for sending email of processed data
    }

    checkPermission() {
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

    ReadSMSList() { //default read all
        this.platform.ready().then((readySource) => {
            const loading = this.loadingCtrl.create({ content: "Reading sms data please wait...", });
            loading.present().then(() => {
                let filter = {
                    box: 'inbox', // 'inbox' (default), 'sent', 'draft'
                    indexFrom: 0, // start from index 0
                    maxCount: this.noOfMsgsToFetch, // count of SMS to return each time
                    // address: mobile,
                };


                //filter sms
                if (SMS) SMS.listSMS(filter, (ListSms) => {
                    this.messages = ListSms;

                    //get time logs
                    this.rawdata = ListSms.filter(function (item) {
                        return (item.body.toLowerCase().substr(0, 4) == 'time' || item.body.toLowerCase().indexOf('sales') > 0);
                    });

                    // this.rawdataJson = JSON.stringify(this.rawdata);

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
            console.log('no data - no processing');
        }
        else {

            const loading = this.loadingCtrl.create({ content: "Processing data please wait...", });
            loading.present().then(() => {
                //first step filtering - filter by startdate and enddate and mobile
                let startDate = new Date(this.startDate),
                    endDate = new Date(this.endDate),
                    mobile = this.mobile;

                //filtering by date range    
                let smsLogsResult: any = $.map(smsdata, function (item, i) {
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
                            let itemMobile = item.address.replace(/[() ]/gm, '').replace('+63', '').replace('0917', '917').trim();
                            if (mobile == itemMobile) {
                                return item;
                            }
                        }
                        else {
                            return item;
                        }
                    }

                });

                //processing of time logs data
                let timeLogsResult: any = $.map(smsLogsResult, function (item, i) {

                    //determine branch
                    let branch = '';
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

                    /*==========
                    extracting data needed for time logs computation
                    ============*/
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
                    let msg = '';
                    let filteredMsg = item.body.replace(/[!@#$%^&~*()_+\-=\[\]{};\':"\\|,.<>?]/gm, ' ').trim();
                    if (item.body.toLowerCase().indexOf('justification') > 0) {
                        msg = filteredMsg.substr(0, filteredMsg.toLowerCase().indexOf('justification')).split(' ');
                    }
                    else {
                        msg = filteredMsg.split(' ');
                    }
                    let name = msg[msg.length - 1].replace(/0/gm, 'o').trim().toLowerCase();

                    //get justification
                    let justification = '';
                    if (item.body.toLowerCase().indexOf('justification') > 0) {
                        justification = item.body.substr(item.body.toLowerCase().indexOf('justification') + 15, item.body.length).trim();
                    }

                    let timein: any = new Date(fulldatetime);
                    let timeinHours = timein.getHours();
                    let timeinMinutes = timein.getMinutes();
                    let sched: any = new Date();
                    let early = 0;
                    let late = 0;
                    let diffMs = 0;
                    let overtime = 0;

                    switch (timeinHours) {
                        case 6:
                            switch (branch) {
                                //only leg2 and drg has 630 as of the moment
                                case 'leg2':
                                case 'drg':
                                    if (timeinMinutes > 45) {
                                        sched = new Date(fulldate + ' ' + '7:00');
                                    }
                                    else {
                                        sched = new Date(fulldate + ' ' + '6:30');
                                    }
                                    break;
                                default:
                                    sched = new Date(fulldate + ' ' + '7:00');
                            }
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
                        case 11://out - lunch break
                        case 12://out - lunch break
                            sched = new Date(fulldate + ' ' + '10:00');
                            break;
                        case 14:
                        case 15:
                            sched = new Date(fulldate + ' ' + '15:00');
                            break;
                        case 16: //out - opening
                            sched = new Date(fulldate + ' ' + '16:00');
                        case 17: //out - 8-5
                        case 18: //out - 8-5
                            sched = new Date(fulldate + ' ' + '17:00');
                        case 19: //out - closing
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

                    // return only time logs
                    if (activity != '') {
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
                    }
                });

                //process multiple users split by slash
                timeLogsResult.forEach((element, index) => {
                    let splitusers: any;
                    if (element.name.indexOf('/') > 0) {
                        splitusers = element.name.split('/');
                        timeLogsResult.splice(index, 1);//remove current item with multiple users and insert 2 new records
                        splitusers.forEach(splituser => {
                            timeLogsResult.splice(index, 0,
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

                // these is only used for dev troubleshooting data
                // this.rawdataJson = JSON.stringify(this.rawdata);
                // this.finalProcessedData = JSON.stringify(timeLogsResult); //processed data json
                // this.timelogs = timeLogsResult;

                //reset
                this.uniqueUsers = [];

                //save unique users 
                timeLogsResult.forEach(item => {
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
                            lateLogs: [],
                            overtime: 0,
                            attendance: 1,
                            timelogs: [],
                            sales: {
                                '330g': 0,
                                '2.7kg': 0,
                                '5kg': 0,
                                '11kg': 0,
                                '22kg': 0,
                                '50kg': 0
                            }
                        });
                    }
                });

                //sum up
                this.uniqueUsers.forEach(item => {
                    timeLogsResult.forEach(element => {
                        if (item.name == element.name) {
                            if (this.excludeJustification) {
                                //don't consider late if justification has value  
                                if (element.justification == '') {
                                    //threshold only sum if more than lateThreshold value
                                    if (element.late > this.lateThreshold) {
                                        item.late += element.late;
                                        item.lateLogs.push(
                                            element.fulldatetime + ' - ' + element.late,
                                        );
                                    }

                                }
                            }
                            else {
                                //threshold only sum if more than lateThreshold value
                                if (element.late > this.lateThreshold) {
                                    item.late += element.late;
                                    item.lateLogs.push(
                                        element.fulldatetime + ' - ' + element.late,
                                    );
                                }
                            }

                            item.early += element.early;
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


                /*==============================================
                * extracting data needed for employee sales performance
                * ==============================================*/
                let salesLogsResult: any = $.map(smsLogsResult, function (item, i) {
                    let smsIsSales = false;

                    //determine branch
                    let branch = '';
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

                    //clean text
                    item.body = item.body.toLowerCase();
                    if (item.body.indexOf('sales') > 0) {
                        //clean
                        item.body = item.body
                            .trim()
                            .replace('magandang gabi', '')
                            .replace('magandanggabi', '')
                            .replace(/^\n|\n$/g, '')
                            .replace('jef:', 'jeff:')
                            .replace('magandanggabi', '');

                        smsIsSales = true;
                    }



                    // return only sales logs
                    if (smsIsSales) {
                        return item;
                    }
                });

                salesLogsResult.forEach(salesItem => {
                    let branch = salesItem.body.substr(0, salesItem.body.indexOf(' '));
                    let salesData = salesItem.body.split('\n');
                    this.uniqueUsers.forEach(uu => {
                        salesData.forEach(sd => {
                            let sdKeyValue:any=[];  
                            sdKeyValue = sd.split('-');

                            switch (branch) {
                                case 'leg1': 
                                    //melvin
                                    //angelo
                                    //bot
                                    //bham

                                    break;
                                case 'leg2':
                                    //angelo
                                    //jerome
                                    //jeff
                                    //walkin = cris
                                    //combined
                                    sdKeyValue = sd.split(':');
                                    break;
                                case 'daraga':
                                case 'drg':
                                    //angelo
                                    break;
                                case 'guinobatan':
                                case 'gbtn':
                                
                                    //angelo
                                    //bryan
                                    //edsel
                                    //combined
                                    //walk in = mark
                                    break;
                                case 'oas': 
                                    //angelo
                                    //erecson
                                    //rr
                                    //nc - who is nc
                                    //walk in = mark
                                    break;
                                case 'ligao':
                                    //angelo
                                    //erics0n
                                    //chano
                                    //walk in = bh
                                    break;

                            }

                            let employee:any  = sdKeyValue[0];

                            //find name 
                            //sdKeyValue[0] is name

                            
                            if (uu.name == employee) {
                                //process salesData
                                //get count per tank
                                if (sdKeyValue[1] != '' && isNaN(sdKeyValue[1])) {
                                    //parse tank types
                                    if (sdKeyValue[1]!=undefined){
                                        let tt = sdKeyValue[1].split(')');
                                        console.log(sdKeyValue[1]);
                                        console.log(tt);
                                        if (Array.isArray(tt)) {
                                            tt.forEach(ttItem => {
                                                console.log(ttItem);
                                                if (ttItem.indexOf('(') > 0) {
                                                    let tanks = ttItem.split('(');
                                                    let count = isNaN(parseInt(tanks[0])) ? 0 : parseInt(tanks[0]);
                                                    switch (tanks[1]) {
                                                        case '11kg':
                                                            uu.sales['11kg'] += count;
                                                            break;
                                                        case '22kg':
                                                            uu.sales['22kg'] += count;
                                                            break;
                                                        case '2.7kg':
                                                            uu.sales['2.7kg'] += count;
                                                            break;
                                                        case '5kg':
                                                            uu.sales['5kg'] += count;
                                                            break;
                                                        case '50kg':
                                                            uu.sales['50kg'] += count;
                                                            break;
                                                    }
                                                }
                                            });
                                        }        
                                    }
                                                                

                                }
                                else {
                                    if(!isNaN(sdKeyValue[1]))
                                    {
                                        let count = isNaN(parseInt(sdKeyValue[1])) ? 0 : parseInt(sdKeyValue[1]);
                                        uu.sales['11kg'] += count;
                                    }
                                        
                                }
                            }
                            
                        });
                    });



                });


                // this.salesLogs = salesLogsResult;
                // this.salesLogsJson = JSON.stringify(salesLogsResult);

                if (this.uniqueUsers.length == 0) {
                    this.noData = true;
                }
                else {
                    this.reportGenerated = true;
                }

                loading.dismiss();
            });
        }
    }

}
