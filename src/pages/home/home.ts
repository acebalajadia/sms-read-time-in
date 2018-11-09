import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
declare let SMS: any;
import { AndroidPermissions } from '@ionic-native/android-permissions';
import * as $ from 'jquery';
import { EmailComposer } from '@ionic-native/email-composer';
import { Screenshot } from '@ionic-native/screenshot';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // build = 'dev';
  build = 'prod';

  //filters
  noOfMsgsToFetch = 4000;
  lateThreshold = 8; //mins
  tempdate = new Date();
  startDate = new Date(
    this.tempdate.getFullYear(),
    this.tempdate.getMonth() - 1,
    1
  ).toISOString();
  endDate = new Date(
    this.tempdate.getFullYear(),
    this.tempdate.getMonth(),
    1
  ).toISOString();
  mobile = '';

  excludeJustification = false;

  noData = false;
  reportGenerated = false;
  finalProcessedData;
  timeLogsRawdata;
  timeLogsRawdataJson;
  salesLogsRawdata;
  remittanceLogsRawdata;
  rawdataJson;
  messages: any = [];
  timelogs: any = [];
  summaryReport: any = [];
  uniqueUsers: any = [];
  uniqueUsersRaw: any = [];

  salesLogs: any = [];
  salesLogsJson: any = [];

  constructor(
    public platform: Platform,
    public androidPermissions: AndroidPermissions,
    private loadingCtrl: LoadingController,
    private emailComposer: EmailComposer,
    private screenshot: Screenshot
  ) {
    if (this.build == 'prod') {
      this.checkPermission();
    }
  }

  ionViewDidLoad() {
    //deploy
    if (this.build == 'prod') {
      this.ReadSMSList();
      this.generateReport();
    }

    //dev test
    if (this.build == 'dev') {
      this.getData();
    }
  }

  //helper for looping in front end
  getNumber = function(num) {
    return new Array(num);
  };

  getData() {
    this.mobile = '';
    //for testing only
    this.timeLogsRawdata = [
      {
        _id: 15499,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1535111277432,
        date_sent: 1535111277000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15498,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1535111256995,
        date_sent: 1535111257000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15495,
        thread_id: 11,
        address: '+639175517548',
        date: 1535110530549,
        date_sent: 1535110529000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15494,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1535110055149,
        date_sent: 1535110054000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time 0ut jer0me',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15493,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1535109814845,
        date_sent: 1535109814000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:erecson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15492,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1535109775497,
        date_sent: 1535109775000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15491,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1535109752608,
        date_sent: 1535109752000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15487,
        thread_id: 11,
        address: '+639175517548',
        date: 1535109334876,
        date_sent: 1535109334000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out ward',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15485,
        thread_id: 11,
        address: '+639175517548',
        date: 1535109252469,
        date_sent: 1535109250000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15481,
        thread_id: 8,
        address: '+639178523162',
        date: 1535108740454,
        date_sent: 1535108740000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15480,
        thread_id: 8,
        address: '+639178523162',
        date: 1535108723867,
        date_sent: 1535108722000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bham"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15478,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1535108593769,
        date_sent: 1535108591000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15477,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1535108569091,
        date_sent: 1535108567000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:mark ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15475,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1535108539744,
        date_sent: 1535108537000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:J0VANI ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15466,
        thread_id: 11,
        address: '+639175517548',
        date: 1535101615082,
        date_sent: 1535101552000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time 0ut chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15454,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1535098717090,
        date_sent: 1535098716000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:RR  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15453,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1535098116431,
        date_sent: 1535098117000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15452,
        thread_id: 8,
        address: '+639178523162',
        date: 1535098098594,
        date_sent: 1535098097000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out melvin',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15441,
        thread_id: 8,
        address: '+639178523162',
        date: 1535095511616,
        date_sent: 1535093424000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15433,
        thread_id: 8,
        address: '+639178523162',
        date: 1535095506636,
        date_sent: 1535079826000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time  0ut "b0t"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15427,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1535095503241,
        date_sent: 1535075975000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15426,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1535095502994,
        date_sent: 1535075672000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in jovani',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15425,
        thread_id: 8,
        address: '+639178523162',
        date: 1535095502704,
        date_sent: 1535068940000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in" bham"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15424,
        thread_id: 11,
        address: '+639175517548',
        date: 1535095502184,
        date_sent: 1535068693000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15423,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1535095501560,
        date_sent: 1535068494000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15418,
        thread_id: 11,
        address: '+639175517548',
        date: 1535066740651,
        date_sent: 1535066740000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in chano ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15417,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1535066037790,
        date_sent: 1535065647000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:eric(oas)',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15416,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1535066037017,
        date_sent: 1535065591000,
        read: 1,
        status: -1,
        type: 1,
        body:
          'TIME IN: cris\nJustification: Arrived 6:56 in store but opening rider arrived 7:05. ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15415,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1535065587119,
        date_sent: 1535065581000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15414,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1535065547537,
        date_sent: 1535065544000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15413,
        thread_id: 11,
        address: '+639175517548',
        date: 1535065480816,
        date_sent: 1535065479000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15412,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1535065422298,
        date_sent: 1535065421000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :RR ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15411,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1535065277551,
        date_sent: 1535065276000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:eric(oas) ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15410,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1535064910370,
        date_sent: 1535064897000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15409,
        thread_id: 8,
        address: '+639178523162',
        date: 1535064814504,
        date_sent: 1535064807000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"melvin"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15408,
        thread_id: 11,
        address: '+639175517548',
        date: 1535064054999,
        date_sent: 1535064054000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15407,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1535063925229,
        date_sent: 1535063923000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in jer0me',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15406,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1535063924468,
        date_sent: 1535063823000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN MARK ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15405,
        thread_id: 8,
        address: '+639178523162',
        date: 1535063413348,
        date_sent: 1535063398000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"b0t"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15389,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1535024331427,
        date_sent: 1535024329000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15388,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1535023508120,
        date_sent: 1535023507000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15382,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1535022966967,
        date_sent: 1535022967000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:eric(oas)',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15381,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1535022897130,
        date_sent: 1535022895000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15379,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1535022828146,
        date_sent: 1535022748000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15378,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1535022725635,
        date_sent: 1535022723000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15373,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1535022634676,
        date_sent: 1535022577000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:RR  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15371,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1535022530945,
        date_sent: 1535022528000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:mark ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15367,
        thread_id: 8,
        address: '+639178523162',
        date: 1535022337192,
        date_sent: 1535022328000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"melvin"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15366,
        thread_id: 8,
        address: '+639178523162',
        date: 1535022336677,
        date_sent: 1535022307000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bham"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15365,
        thread_id: 11,
        address: '+639175517548',
        date: 1535022336252,
        date_sent: 1535022256000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timeout:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15364,
        thread_id: 11,
        address: '+639175517548',
        date: 1535022335837,
        date_sent: 1535022231000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15354,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1535013253601,
        date_sent: 1535013251000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15353,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1535012895510,
        date_sent: 1535012894000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out jovani',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15351,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1535011816768,
        date_sent: 1535011813000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15349,
        thread_id: 8,
        address: '+639178523162',
        date: 1535011498636,
        date_sent: 1535011496000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15332,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1535010322958,
        date_sent: 1535010006000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time 0ut jer0me',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15331,
        thread_id: 11,
        address: '+639175517548',
        date: 1535010320096,
        date_sent: 1535009798000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15327,
        thread_id: 8,
        address: '+639178523162',
        date: 1535006102496,
        date_sent: 1535006098000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"melvin"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15291,
        thread_id: 8,
        address: '+639178523162',
        date: 1534993487700,
        date_sent: 1534993485000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"melvin"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15290,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534993279877,
        date_sent: 1534993277000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15288,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534990379078,
        date_sent: 1534990379000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:eric(oas)',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15287,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534989316759,
        date_sent: 1534989316000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :RR ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15286,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534988702389,
        date_sent: 1534988701000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15276,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534982993541,
        date_sent: 1534982991000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15275,
        thread_id: 8,
        address: '+639178523162',
        date: 1534982658408,
        date_sent: 1534982587000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in bham',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15274,
        thread_id: 11,
        address: '+639175517548',
        date: 1534982569890,
        date_sent: 1534982569000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15271,
        thread_id: 11,
        address: '+639175517548',
        date: 1534979518975,
        date_sent: 1534979518000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15270,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534979168195,
        date_sent: 1534979166000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15269,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534979140117,
        date_sent: 1534979139000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15268,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534978852100,
        date_sent: 1534978850000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15267,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534978651173,
        date_sent: 1534978650000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN MARK ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15266,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534978625446,
        date_sent: 1534978624000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :jovani  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15265,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534978523213,
        date_sent: 1534978522000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15264,
        thread_id: 8,
        address: '+639178523162',
        date: 1534978358082,
        date_sent: 1534978356000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"melvin"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15262,
        thread_id: 11,
        address: '+639175517548',
        date: 1534978136656,
        date_sent: 1534978135000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15260,
        thread_id: 8,
        address: '+639178523162',
        date: 1534976080012,
        date_sent: 1534976078000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"b0t"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15259,
        thread_id: 11,
        address: '+639175517548',
        date: 1534939898562,
        date_sent: 1534939896000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time0ut js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15258,
        thread_id: 11,
        address: '+639175517548',
        date: 1534939182350,
        date_sent: 1534939180000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15252,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534936286390,
        date_sent: 1534936106000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15251,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534936285176,
        date_sent: 1534936099000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15250,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534936284031,
        date_sent: 1534936067000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out.chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15249,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534936282425,
        date_sent: 1534936016000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15245,
        thread_id: 8,
        address: '+639178523162',
        date: 1534936273230,
        date_sent: 1534935812000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"melvin"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15243,
        thread_id: 8,
        address: '+639178523162',
        date: 1534936267769,
        date_sent: 1534935789000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bham"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15242,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534936266592,
        date_sent: 1534935785000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:J0VANI ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15240,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534936262600,
        date_sent: 1534935758000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:RR  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15238,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534936258898,
        date_sent: 1534935723000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:mark ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15219,
        thread_id: 11,
        address: '+639175517548',
        date: 1534926630941,
        date_sent: 1534926629000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timeout:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15218,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534925203188,
        date_sent: 1534925201000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15217,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534925178341,
        date_sent: 1534925176000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:eric(oas)',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15207,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534902320665,
        date_sent: 1534902320000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15201,
        thread_id: 11,
        address: '+639175517548',
        date: 1534896122164,
        date_sent: 1534896113000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15200,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534896053355,
        date_sent: 1534895798000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN MARK ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15199,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534896052169,
        date_sent: 1534895083000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15198,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534896050988,
        date_sent: 1534894400000,
        read: 1,
        status: -1,
        type: 1,
        body:
          'TIME IN: jer0me\nJustification: Arrived 650 in store but opening rider arrived 732. ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15197,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534896049120,
        date_sent: 1534893416000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15196,
        thread_id: 11,
        address: '+639175517548',
        date: 1534896047932,
        date_sent: 1534892994000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15195,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534896046777,
        date_sent: 1534892518000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15194,
        thread_id: 8,
        address: '+639178523162',
        date: 1534896045592,
        date_sent: 1534892488000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time"in bham',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15193,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534896044428,
        date_sent: 1534892483000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15192,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534896043441,
        date_sent: 1534892360000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :jovani  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15191,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534896041581,
        date_sent: 1534892327000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :RR ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15190,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534896040364,
        date_sent: 1534892093000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:eric(oas)',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15189,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534896037899,
        date_sent: 1534892057000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15188,
        thread_id: 8,
        address: '+639178523162',
        date: 1534893315409,
        date_sent: 1534891908000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time"in melvin',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15187,
        thread_id: 11,
        address: '+639175517548',
        date: 1534890780037,
        date_sent: 1534890443000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15182,
        thread_id: 11,
        address: '+639175517548',
        date: 1534851342516,
        date_sent: 1534850951000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15181,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534850157641,
        date_sent: 1534850085000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15180,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534850157071,
        date_sent: 1534850067000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15179,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534850156571,
        date_sent: 1534850047000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out jer0me',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15178,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534850156045,
        date_sent: 1534850040000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:eric(oas)',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15177,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534850006576,
        date_sent: 1534850005000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15176,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534850000564,
        date_sent: 1534849982000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out.chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15175,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534850000035,
        date_sent: 1534849977000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15174,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534849999531,
        date_sent: 1534849975000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out.chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15171,
        thread_id: 11,
        address: '+639175517548',
        date: 1534849997373,
        date_sent: 1534849772000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15166,
        thread_id: 8,
        address: '+639178523162',
        date: 1534849995086,
        date_sent: 1534849448000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15164,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534849992808,
        date_sent: 1534849416000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15163,
        thread_id: 8,
        address: '+639178523162',
        date: 1534849992081,
        date_sent: 1534849411000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bham"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15161,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534849990698,
        date_sent: 1534849367000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:J0VANI ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15160,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534849990049,
        date_sent: 1534849343000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:RR  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15159,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534849989332,
        date_sent: 1534849316000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:mark ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15152,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534839301253,
        date_sent: 1534839299000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15151,
        thread_id: 11,
        address: '+639175517548',
        date: 1534837379736,
        date_sent: 1534837379000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time0ut js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15149,
        thread_id: 11,
        address: '+639175517548',
        date: 1534834405200,
        date_sent: 1534834405000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15148,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534834004767,
        date_sent: 1534834005000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15146,
        thread_id: 11,
        address: '+639175517548',
        date: 1534821322719,
        date_sent: 1534821318000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15145,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534820932149,
        date_sent: 1534820931000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out.chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15141,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534816735609,
        date_sent: 1534816734000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15140,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534816612941,
        date_sent: 1534816605000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in eric',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15136,
        thread_id: 11,
        address: '+639175517548',
        date: 1534811022351,
        date_sent: 1534810501000,
        read: 1,
        status: -1,
        type: 1,
        body:
          'time in ems\njustification:8:00 arrived in store but kuya jeff bring the cp .',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15135,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534809515375,
        date_sent: 1534809515000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15134,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534809417215,
        date_sent: 1534809413000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN MARK ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15132,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534806328972,
        date_sent: 1534806330000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15131,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534806309426,
        date_sent: 1534806279000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15130,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534806309107,
        date_sent: 1534806267000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :RR ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15129,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534806308842,
        date_sent: 1534806239000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :jovani  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15128,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534806308339,
        date_sent: 1534806233000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15127,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534805554098,
        date_sent: 1534805516000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15126,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534805553600,
        date_sent: 1534805489000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15125,
        thread_id: 8,
        address: '+639178523162',
        date: 1534805303814,
        date_sent: 1534805300000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in "bam"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15123,
        thread_id: 11,
        address: '+639175517548',
        date: 1534804645966,
        date_sent: 1534804643000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein js0n ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15120,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534804570965,
        date_sent: 1534804567000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in jer0me',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15119,
        thread_id: 11,
        address: '+639175517548',
        date: 1534803941562,
        date_sent: 1534803938000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15118,
        thread_id: 8,
        address: '+639178523162',
        date: 1534803400721,
        date_sent: 1534803391000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in "b0t"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15112,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534764703264,
        date_sent: 1534764702000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out jer0me',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15111,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534763916065,
        date_sent: 1534763913000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15109,
        thread_id: 11,
        address: '+639175517548',
        date: 1534763712881,
        date_sent: 1534763711000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out adjelo',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15107,
        thread_id: 8,
        address: '+639178523162',
        date: 1534763696009,
        date_sent: 1534763604000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out melvin',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15106,
        thread_id: 8,
        address: '+639178523162',
        date: 1534763695485,
        date_sent: 1534763575000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15105,
        thread_id: 11,
        address: '+639175517548',
        date: 1534763552005,
        date_sent: 1534763551000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timeout:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15100,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534763361134,
        date_sent: 1534763360000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15099,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534763330464,
        date_sent: 1534763329000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15096,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534763046359,
        date_sent: 1534763046000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15095,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534763045911,
        date_sent: 1534763045000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:J0VANI ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15094,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534762993889,
        date_sent: 1534762994000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:RR  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15093,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534762992494,
        date_sent: 1534762992000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out.chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15091,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534762963876,
        date_sent: 1534762963000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:mark ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15082,
        thread_id: 8,
        address: '+639178523162',
        date: 1534753317874,
        date_sent: 1534753120000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out bhot',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15081,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534753084191,
        date_sent: 1534753082000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15079,
        thread_id: 8,
        address: '+639178523162',
        date: 1534747894796,
        date_sent: 1534747893000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in melvin',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15078,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534747655699,
        date_sent: 1534747655000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15077,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534737547529,
        date_sent: 1534737229000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out.chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15076,
        thread_id: 8,
        address: '+639178523162',
        date: 1534734427904,
        date_sent: 1534734104000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out melvin',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15068,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534729744030,
        date_sent: 1534729731000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15058,
        thread_id: 8,
        address: '+639178523162',
        date: 1534722777998,
        date_sent: 1534722775000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in, ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15057,
        thread_id: 11,
        address: '+639175517548',
        date: 1534720117117,
        date_sent: 1534720108000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15056,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534719929973,
        date_sent: 1534719928000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15055,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534719781345,
        date_sent: 1534719780000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :jovani  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15054,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534719709137,
        date_sent: 1534719709000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15053,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534719699484,
        date_sent: 1534719698000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :MARK  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15052,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534719672037,
        date_sent: 1534719672000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :RR ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15051,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534719668741,
        date_sent: 1534719667000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15050,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534719570158,
        date_sent: 1534719568000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15049,
        thread_id: 8,
        address: '+639178523162',
        date: 1534718867218,
        date_sent: 1534718865000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"melvin"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15048,
        thread_id: 11,
        address: '+639175517548',
        date: 1534718589009,
        date_sent: 1534718587000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in adjelo',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15047,
        thread_id: 11,
        address: '+639175517548',
        date: 1534717639615,
        date_sent: 1534717637000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15046,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534717624296,
        date_sent: 1534717622000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in jer0me',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15045,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534717450917,
        date_sent: 1534717449000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15044,
        thread_id: 8,
        address: '+639178523162',
        date: 1534717280472,
        date_sent: 1534717278000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15043,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534678948862,
        date_sent: 1534678949000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15042,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534678917211,
        date_sent: 1534678917000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15039,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534677732242,
        date_sent: 1534677732000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15038,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534677709799,
        date_sent: 1534677708000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out.chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15035,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534677183383,
        date_sent: 1534677176000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15034,
        thread_id: 8,
        address: '+639178523162',
        date: 1534677168751,
        date_sent: 1534677133000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15033,
        thread_id: 8,
        address: '+639178523162',
        date: 1534677167538,
        date_sent: 1534677115000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bham"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15030,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534677039979,
        date_sent: 1534677035000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:mark ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15027,
        thread_id: 11,
        address: '+639175517548',
        date: 1534676735981,
        date_sent: 1534676731000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timeout:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15025,
        thread_id: 11,
        address: '+639175517548',
        date: 1534676683770,
        date_sent: 1534676679000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15022,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534676220949,
        date_sent: 1534676214000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15018,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534668986549,
        date_sent: 1534668986000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:RR  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15017,
        thread_id: 11,
        address: '+639175517548',
        date: 1534667663955,
        date_sent: 1534667009000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time0ut js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15016,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534667663304,
        date_sent: 1534666100000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15015,
        thread_id: 8,
        address: '+639178523162',
        date: 1534667662758,
        date_sent: 1534665676000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"melvin"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15014,
        thread_id: 11,
        address: '+639175517548',
        date: 1534667662290,
        date_sent: 1534663342000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15013,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534667661925,
        date_sent: 1534662372000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:erics0n ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15012,
        thread_id: 8,
        address: '+639178523162',
        date: 1534667660948,
        date_sent: 1534660556000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in :bham',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15011,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534652524956,
        date_sent: 1534652208000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:erics0n ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15007,
        thread_id: 11,
        address: '+639175517548',
        date: 1534648374928,
        date_sent: 1534648374000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15006,
        thread_id: 8,
        address: '+639178523162',
        date: 1534648028063,
        date_sent: 1534648028000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"bham"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15002,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534643502158,
        date_sent: 1534643500000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :MARK  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15001,
        thread_id: 11,
        address: '+639175517548',
        date: 1534643425411,
        date_sent: 1534643424000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 15000,
        thread_id: 8,
        address: '+639178523162',
        date: 1534642763958,
        date_sent: 1534642763000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14999,
        thread_id: 11,
        address: '+639175517548',
        date: 1534637340539,
        date_sent: 1534637338000,
        read: 1,
        status: -1,
        type: 1,
        body:
          'time in ems\njustification;arrived 6:57 in store but rider arrived 8:07 due to repair of tricycle .',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14998,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534633884568,
        date_sent: 1534633883000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :RR \njustification due to ericson ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14997,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534633798924,
        date_sent: 1534633797000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:erics0n \njustificAtion due to flat tires',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14996,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534633744242,
        date_sent: 1534633743000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14995,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534633714822,
        date_sent: 1534633713000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14994,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534633678393,
        date_sent: 1534633677000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14993,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534633388137,
        date_sent: 1534633385000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out.chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14992,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534633256928,
        date_sent: 1534633255000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14991,
        thread_id: 8,
        address: '+639178523162',
        date: 1534632659581,
        date_sent: 1534632657000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in bham',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14990,
        thread_id: 8,
        address: '+639178523162',
        date: 1534632632669,
        date_sent: 1534632632000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in melvin',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14989,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534631885133,
        date_sent: 1534631569000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14988,
        thread_id: 11,
        address: '+639175517548',
        date: 1534631552750,
        date_sent: 1534631551000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14979,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534592738301,
        date_sent: 1534592736000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out jer0me',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14978,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534591985688,
        date_sent: 1534591984000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14977,
        thread_id: 11,
        address: '+639175517548',
        date: 1534591895188,
        date_sent: 1534591894000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time0ut js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14976,
        thread_id: 8,
        address: '+639178523162',
        date: 1534591858724,
        date_sent: 1534591857000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"melvin"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14975,
        thread_id: 8,
        address: '+639178523162',
        date: 1534591837559,
        date_sent: 1534591837000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bham"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14972,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534591503430,
        date_sent: 1534591501000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14971,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534591480195,
        date_sent: 1534591476000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14967,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534590829663,
        date_sent: 1534590823000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out jovani',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14966,
        thread_id: 11,
        address: '+639175517548',
        date: 1534590790932,
        date_sent: 1534590790000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14964,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534590705378,
        date_sent: 1534590697000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME IN :MARK  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14959,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534590262189,
        date_sent: 1534590260000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out.chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14958,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534590235348,
        date_sent: 1534590234000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14953,
        thread_id: 8,
        address: '+639178523162',
        date: 1534582374450,
        date_sent: 1534581957000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14952,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534580947431,
        date_sent: 1534580946000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14951,
        thread_id: 11,
        address: '+639175517548',
        date: 1534577833262,
        date_sent: 1534577831000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14950,
        thread_id: 11,
        address: '+639175517548',
        date: 1534575420514,
        date_sent: 1534575419000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14949,
        thread_id: 8,
        address: '+639178523162',
        date: 1534574906960,
        date_sent: 1534574906000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"melvin"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14948,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534574872863,
        date_sent: 1534574872000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14945,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534562968307,
        date_sent: 1534562964000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out.chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14944,
        thread_id: 11,
        address: '+639175517548',
        date: 1534562967870,
        date_sent: 1534562823000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time0ut js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14929,
        thread_id: 8,
        address: '+639178523162',
        date: 1534561656596,
        date_sent: 1534561339000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"melvin" ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14927,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534559593672,
        date_sent: 1534557521000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in jovani',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14926,
        thread_id: 8,
        address: '+639178523162',
        date: 1534559593009,
        date_sent: 1534557292000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in, bham ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14925,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534559592625,
        date_sent: 1534556924000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14924,
        thread_id: 11,
        address: '+639175517548',
        date: 1534559591711,
        date_sent: 1534556909000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14923,
        thread_id: 11,
        address: '+639175517548',
        date: 1534547823252,
        date_sent: 1534547821000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein js0n',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14922,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534547617348,
        date_sent: 1534547615000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14921,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534547524124,
        date_sent: 1534547522000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14920,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534547490985,
        date_sent: 1534547487000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14919,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534547265430,
        date_sent: 1534547263000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:erics0n ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14918,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534547225645,
        date_sent: 1534547225000,
        read: 1,
        status: -1,
        type: 1,
        body:
          'Time in:mark          justification was late due to Late po dmting c ericson',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14917,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534546611102,
        date_sent: 1534546608000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14916,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534546588290,
        date_sent: 1534546586000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14915,
        thread_id: 8,
        address: '+639178523162',
        date: 1534546308749,
        date_sent: 1534546307000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"melvin"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14914,
        thread_id: 11,
        address: '+639175517548',
        date: 1534545950167,
        date_sent: 1534545947000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14913,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534545455374,
        date_sent: 1534545453000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in jer0me',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14912,
        thread_id: 8,
        address: '+639178523162',
        date: 1534543937541,
        date_sent: 1534543936000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14911,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534508878143,
        date_sent: 1534506979000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14910,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534508877471,
        date_sent: 1534505870000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14907,
        thread_id: 11,
        address: '+639175517548',
        date: 1534508875435,
        date_sent: 1534504423000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timeout:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14906,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534508874566,
        date_sent: 1534504405000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out jovani',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14904,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534508872800,
        date_sent: 1534504273000,
        read: 1,
        status: -1,
        type: 1,
        body: 'TIME OUT:RR  ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14903,
        thread_id: 11,
        address: '+639175517548',
        date: 1534508872271,
        date_sent: 1534504252000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14902,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534508871627,
        date_sent: 1534504233000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14901,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534508871093,
        date_sent: 1534504212000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out chan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14897,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534508865812,
        date_sent: 1534504094000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:paul',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14895,
        thread_id: 254,
        address: '+63 917 533 0854',
        date: 1534508864531,
        date_sent: 1534504068000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out.chano',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14893,
        thread_id: 8,
        address: '+639178523162',
        date: 1534508863496,
        date_sent: 1534503917000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14892,
        thread_id: 8,
        address: '+639178523162',
        date: 1534508862987,
        date_sent: 1534503894000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bham"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14874,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534494089658,
        date_sent: 1534494088000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out jer0me',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14872,
        thread_id: 8,
        address: '+639178523162',
        date: 1534493982717,
        date_sent: 1534493979000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out:melvin',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14871,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534493320705,
        date_sent: 1534493157000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out bryan',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14864,
        thread_id: 11,
        address: '+639175517548',
        date: 1534488805205,
        date_sent: 1534488803000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timein:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14863,
        thread_id: 8,
        address: '+639178523162',
        date: 1534488232209,
        date_sent: 1534488229000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14862,
        thread_id: 11,
        address: '+639175517548',
        date: 1534476588693,
        date_sent: 1534476587000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time out:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14861,
        thread_id: 11,
        address: '+639175517548',
        date: 1534476107621,
        date_sent: 1534475961000,
        read: 1,
        status: -1,
        type: 1,
        body: 'timeout:ben',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14860,
        thread_id: 8,
        address: '+639178523162',
        date: 1534474838705,
        date_sent: 1534474836000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time out"bot"',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14859,
        thread_id: 10,
        address: '+63 917 533 0584',
        date: 1534471053898,
        date_sent: 1534471005000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in jovani',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14858,
        thread_id: 255,
        address: '+63 917 838 5603',
        date: 1534470714893,
        date_sent: 1534470503000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in edsel',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14856,
        thread_id: 11,
        address: '+639175517548',
        date: 1534464241131,
        date_sent: 1534464224000,
        read: 1,
        status: -1,
        type: 1,
        body: 'time in ems',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14855,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534463993635,
        date_sent: 1534463993000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in cris',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14854,
        thread_id: 8,
        address: '+639178523162',
        date: 1534463956993,
        date_sent: 1534463954000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in,bham',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14853,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534463155312,
        date_sent: 1534463152000,
        read: 1,
        status: -1,
        type: 1,
        body:
          'TIME IN: jer0me\nJustification: Arrived 652 in store but opening rider arrived 730. ',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      },
      {
        _id: 14852,
        thread_id: 9,
        address: '(0917) 852 5794',
        date: 1534461297703,
        date_sent: 1534461296000,
        read: 1,
        status: -1,
        type: 1,
        body: 'Time in jeff',
        service_center: '+639170000299',
        locked: 0,
        sub_id: 3,
        error_code: 0,
        creator: 'com.textra',
        seen: 0,
        priority: -1
      }
    ];

    //get time logs
    this.timeLogsRawdata = this.timeLogsRawdata.filter(function(item) {
      return item.body.toLowerCase().substr(0, 4) == 'time';
    });

    this.processTimeLogs();
  }

  generateReport() {
    //generate all
    this.mobile = '';
    this.processTimeLogs();
  }

  generateLeg1Report() {
    this.mobile = '9178523162';
    this.processTimeLogs();
  }
  generateLeg2Report() {
    this.mobile = '9178525794';
    this.processTimeLogs();
  }
  generateDrgReport() {
    this.mobile = '9175517548';
    this.processTimeLogs();
  }
  generateOasReport() {
    this.mobile = '9175330584';
    this.processTimeLogs();
  }
  generateGuinobatanReport() {
    this.mobile = '9178385603';
    this.processTimeLogs();
  }
  generateLigaoReport() {
    this.mobile = '9175330854';
    this.processTimeLogs();
  }
  generateCastillaReport() {
    this.mobile = '9178140654';
    this.processTimeLogs();
  }

  sendReportDataToEmail() {
    let email = {
      to: 'acebalajadia@gmail.com',
      //   cc: 'acebalajadia@gmail.com',
      subject: 'ionic email sending test',
      body: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      isHtml: true
    };

    this.emailComposer.open(email);

    //code for sending email of processed data
    // this.emailComposer.isAvailable().then((available: boolean) => {
    //     if (available) {
    //         //Now we know we can send
    //     }
    // });
    // let email = {
    //     to: 'acebalajadia@gmail.com',
    //     subject: 'Prgaz time logs test data for dev',
    //     body: 'testing email',
    //     isHtml: false
    // };
    // // Send a text message using default options
    // this.emailComposer.open(email);
  }



  checkPermission() {
    this.androidPermissions
      .checkPermission(this.androidPermissions.PERMISSION.READ_SMS)
      .then(
        success => {
          //if permission granted
          // this.ReadSMSList();
        },
        err => {
          this.androidPermissions
            .requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
            .then(
              success => {
                this.ReadSMSList();
              },
              err => {
                alert('cancelled');
              }
            );
        }
      );

    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.READ_SMS
    ]);
  }

  ReadSMSList() {
    //default read all
    this.platform.ready().then(readySource => {
      const loading = this.loadingCtrl.create({
        content: 'Reading sms data please wait...'
      });
      loading.present().then(() => {
        let filter = {
          box: 'inbox', // 'inbox' (default), 'sent', 'draft'
          indexFrom: 0, // start from index 0
          maxCount: this.noOfMsgsToFetch // count of SMS to return each time
          // address: mobile,
        };

        //filter sms
        if (SMS)
          SMS.listSMS(
            filter,
            ListSms => {
              this.messages = ListSms;

              //get time logs
              this.timeLogsRawdata = ListSms.filter(function(item) {
                return item.body.toLowerCase().substr(0, 4) == 'time';
              });

              //get sales logs
              this.salesLogsRawdata = ListSms.filter(function(item) {
                return item.body.toLowerCase().indexOf('sales') > 0;
              });

              //get remittance logs
              this.remittanceLogsRawdata = ListSms.filter(function(item) {
                return item.body.toLowerCase().substr(0, 10) == 'remittance';
              });

              this.timeLogsRawdataJson = JSON.stringify(this.timeLogsRawdata);

              //this.processTimeLogs(smsdata);
            },
            Error => {
              alert(JSON.stringify(Error));
            }
          );

        loading.dismiss();
      });
    });
  }

  processTimeLogs(smsdata = this.timeLogsRawdata) {
    if (smsdata.length == 0) {
      console.log('no data - no processing');
    } else {
      const loading = this.loadingCtrl.create({
        content: 'Processing data please wait...'
      });
      loading.present().then(() => {
        //first step filtering - filter by startdate and enddate and mobile
        let startDate = new Date(this.startDate),
          endDate = new Date(this.endDate),
          mobile = this.mobile;

        //filtering by date range
        let smsLogsResult: any = $.map(smsdata, function(item, i) {
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
              let itemMobile = item.address
                .replace(/[() ]/gm, '')
                .replace('+63', '')
                .replace('0917', '917')
                .trim();
              if (mobile == itemMobile) {
                return item;
              }
            } else {
              return item;
            }
          }
        });

        //processing of time logs data
        let timeLogsResult: any = $.map(smsLogsResult, function(item, i) {
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
            case '+639178140654':
              branch = 'castilla';
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
            prefix = item.body.substr(0, 6), //get first 6 chars
            activity;

          prefix = prefix
            .toLowerCase()
            .replace(/ /g, '')
            .substr(0, 5); //remove space and get 5 chars

          if (prefix == 'timei') {
            activity = 'IN';
          } else if (prefix == 'timeo' || prefix == 'time0') {
            activity = 'OUT';
          }

          //get name
          let msg = '';
          let filteredMsg = item.body
            .replace(/[!@#$%^&~*()_+\-=\[\]{};\':"\\|,.<>?]/gm, ' ')
            .trim();
          filteredMsg = filteredMsg.replace('  ', ' ').replace('\n', ' ');
          if (item.body.toLowerCase().indexOf('justification') > 0) {
            msg = filteredMsg
              .substr(0, filteredMsg.toLowerCase().indexOf('justification'))
              .trim()
              .split(' ');
          } else {
            msg = filteredMsg.split(' ');
          }
          let name = msg[msg.length - 1]
            .replace(/0/gm, 'o')
            .trim()
            .toLowerCase();

          //get justification
          let justification = '';
          if (item.body.toLowerCase().indexOf('justification') > 0) {
            justification = item.body
              .substr(
                item.body.toLowerCase().indexOf('justification') + 14,
                item.body.length
              )
              .trim();
          }

          let timein: any = new Date(fulldatetime);
          let timeinHours = timein.getHours();
          let timeinMinutes = timein.getMinutes();
          let sched: any = new Date();
          let schedout: any = new Date();
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
                  if (timeinMinutes > 50) {
                    sched = new Date(fulldate + ' ' + '7:00');
                    schedout = new Date(fulldate + ' ' + '16:00');
                  } else {
                    sched = new Date(fulldate + ' ' + '6:30');
                    schedout = new Date(fulldate + ' ' + '15:30');
                  }
                  break;
                default:
                  sched = new Date(fulldate + ' ' + '7:00');
                  schedout = new Date(fulldate + ' ' + '16:00');
              }
              break;
            case 7:
              if (timeinMinutes > 30) {
                //fall to 8am schedule only for BH names
                switch (name) {
                  case 'ben':
                  case 'ems':
                  case 'bham':
                  case 'bam':
                  case 'cris':
                  case 'mark':
                  case 'paul':
                  case 'chan':
                  case 'ward':
                  case 'eric':
                  case 'son':
                  case 'ericson':
                    sched = new Date(fulldate + ' ' + '8:00');
                    schedout = new Date(fulldate + ' ' + '17:00');
                    break;
                  default:
                    sched = new Date(fulldate + ' ' + '7:00');
                    schedout = new Date(fulldate + ' ' + '16:00');
                    break;
                }
              } else {
                sched = new Date(fulldate + ' ' + '7:00');
                schedout = new Date(fulldate + ' ' + '16:00');
              }
              break;
            case 8:
              //fall to 8am schedule only for BH names
              switch (name) {
                case 'ben':
                case 'ems':
                case 'bham':
                case 'bam':
                case 'cris':
                case 'mark':
                case 'paul':
                case 'chan':
                case 'ward':
                case 'eric':
                case 'son':
                case 'ericson':
                  sched = new Date(fulldate + ' ' + '8:00');
                  schedout = new Date(fulldate + ' ' + '17:00');
                  break;
                default:
                  sched = new Date(fulldate + ' ' + '7:00');
                  schedout = new Date(fulldate + ' ' + '16:00');
                  break;
              }
              break;
            case 9:
            case 10:
              sched = new Date(fulldate + ' ' + '10:00');
              schedout = new Date(fulldate + ' ' + '21:00');
              break;
            case 11: //out - lunch break
            case 12: //out - lunch break
              sched = new Date(fulldate + ' ' + '10:00');
              schedout = new Date(fulldate + ' ' + '21:00');
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
            diffMs = Math.round(
              (((sched - timein) % 86400000) % 3600000) / 60000
            ); // minutes
            if (diffMs > 0) {
              early = diffMs;
            } else {
              late = Math.round(
                (((timein - sched) % 86400000) % 3600000) / 60000
              ); // minutes;
            }
          } else {
            //calculate overtime
            //ot data is not realiable in this app due to complexity of schedules and
            //schedules in this app are only based on assumptions and not the actual schedule
            //assigned to a person on each day
            diffMs = Math.round(
              (((timein - sched) % 86400000) % 3600000) / 60000
            ); // minutes
            if (diffMs > 30) overtime = diffMs;
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
              sched:
                sched.getHours() +
                ':' +
                (sched.getMinutes() == 0 ? '00' : sched.getMinutes()),
              justification: justification
            };
          }
        });

        //process multiple users split by slash
        timeLogsResult.forEach((element, index) => {
          let splitusers: any;
          if (element.name.indexOf('/') > 0) {
            splitusers = element.name.split('/');
            timeLogsResult.splice(index, 1); //remove current item with multiple users and insert 2 new records
            splitusers.forEach(splituser => {
              timeLogsResult.splice(index, 0, {
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
        // this.timeLogsRawdataJson = JSON.stringify(this.timeLogsRawdata);
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
                      element.fulldatetime + ' - ' + element.late
                    );
                  }
                }
              } else {
                //threshold only sum if more than lateThreshold value
                if (element.late > this.lateThreshold) {
                  item.late += element.late;
                  item.lateLogs.push(
                    element.fulldatetime + ' - ' + element.late
                  );
                }
              }

              item.early += element.early;
              //threshold only sum if more than 15m
              if (element.overtime > 30) item.overtime += element.overtime;

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
        // let salesLogsResult: any = $.map(smsLogsResult, function (item, i) {
        //     let smsIsSales = false;

        //     //determine branch
        //     let branch = '';
        //     switch (item.address) {
        //         case '+639178523162':
        //             branch = 'leg1';
        //             break;
        //         case '(0917) 852 5794':
        //         case '+639178525794':
        //             branch = 'leg2';
        //             break;
        //         case '+639175517548':
        //             branch = 'drg';
        //             break;
        //         case '+63 917 533 0584':
        //         case '+639175330584':
        //             branch = 'oas';
        //             break;
        //         case '+63 917 838 5603':
        //         case '+639178385603':
        //             branch = 'guinobatan';
        //             break;
        //         case '+63 917 533 0854':
        //         case '+639175330854':
        //             branch = 'ligao';
        //             break;
        //     }

        //     //clean text
        //     item.body = item.body.toLowerCase();
        //     if (item.body.indexOf('sales') > 0) {
        //         //clean
        //         item.body = item.body
        //             .trim()
        //             .replace('magandang gabi', '')
        //             .replace('magandanggabi', '')
        //             .replace(/^\n|\n$/g, '')
        //             .replace('jef:', 'jeff:')
        //             .replace('magandanggabi', '');

        //         smsIsSales = true;
        //     }

        //     // return only sales logs
        //     if (smsIsSales) {
        //         return item;
        //     }
        // });

        // salesLogsResult.forEach(salesItem => {
        //     let branch = salesItem.body.substr(0, salesItem.body.indexOf(' '));
        //     let salesData = salesItem.body.split('\n');
        //     this.uniqueUsers.forEach(uu => {
        //         salesData.forEach(sd => {
        //             let sdKeyValue: any = [];
        //             sdKeyValue = sd.split('-');

        //             switch (branch) {
        //                 case 'leg1':
        //                     //melvin
        //                     //angelo
        //                     //bot
        //                     //bham

        //                     break;
        //                 case 'leg2':
        //                     //angelo
        //                     //jerome
        //                     //jeff
        //                     //walkin = cris
        //                     //combined
        //                     sdKeyValue = sd.split(':');
        //                     break;
        //                 case 'daraga':
        //                 case 'drg':
        //                     //angelo
        //                     break;
        //                 case 'guinobatan':
        //                 case 'gbtn':

        //                     //angelo
        //                     //bryan
        //                     //edsel
        //                     //combined
        //                     //walk in = mark
        //                     break;
        //                 case 'oas':
        //                     //angelo
        //                     //erecson
        //                     //rr
        //                     //nc - who is nc
        //                     //walk in = mark
        //                     break;
        //                 case 'ligao':
        //                     //angelo
        //                     //erics0n
        //                     //chano
        //                     //walk in = bh
        //                     break;

        //             }

        //             let employee: any = sdKeyValue[0];

        //             //find name
        //             //sdKeyValue[0] is name

        //             if (uu.name == employee) {
        //                 //process salesData
        //                 //get count per tank
        //                 if (sdKeyValue[1] != '' && isNaN(sdKeyValue[1])) {
        //                     //parse tank types
        //                     if (sdKeyValue[1] != undefined) {
        //                         let tt = sdKeyValue[1].split(')');
        //                         console.log(sdKeyValue[1]);
        //                         console.log(tt);
        //                         if (Array.isArray(tt)) {
        //                             tt.forEach(ttItem => {
        //                                 console.log(ttItem);
        //                                 if (ttItem.indexOf('(') > 0) {
        //                                     let tanks = ttItem.split('(');
        //                                     let count = isNaN(parseInt(tanks[0])) ? 0 : parseInt(tanks[0]);
        //                                     switch (tanks[1]) {
        //                                         case '11kg':
        //                                             uu.sales['11kg'] += count;
        //                                             break;
        //                                         case '22kg':
        //                                             uu.sales['22kg'] += count;
        //                                             break;
        //                                         case '2.7kg':
        //                                             uu.sales['2.7kg'] += count;
        //                                             break;
        //                                         case '5kg':
        //                                             uu.sales['5kg'] += count;
        //                                             break;
        //                                         case '50kg':
        //                                             uu.sales['50kg'] += count;
        //                                             break;
        //                                     }
        //                                 }
        //                             });
        //                         }
        //                     }

        //                 }
        //                 else {
        //                     if (!isNaN(sdKeyValue[1])) {
        //                         let count = isNaN(parseInt(sdKeyValue[1])) ? 0 : parseInt(sdKeyValue[1]);
        //                         uu.sales['11kg'] += count;
        //                     }

        //                 }
        //             }

        //         });
        //     });

        // });

        // this.salesLogs = salesLogsResult;
        // this.salesLogsJson = JSON.stringify(salesLogsResult);

        if (this.uniqueUsers.length == 0) {
          this.noData = true;
        } else {
          this.reportGenerated = true;
        }

        loading.dismiss();
      });
    }
  }
}
