import { Component, OnInit } from '@angular/core';
import { RdcService } from '../_services/rdc.service';
// import {FsService} from 'ngx-fs';
// import { writeFileSync, readFileSync } from 'fs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public show = false;
  public speedtestData;
  public errorMsg;
  public SiteName;
  public siteUrl;
  public httpversion;
  public pageDT;
  public modaldata;
  constructor(private _rdcService: RdcService) { }
  ngOnInit() {
  //  const fs = require('fs');
    this._rdcService.getAllApiSpeed().subscribe(data => {
      if (data) {
        this.showSpeedTestData(data);
      }
      else {
        console.log("File not uploaded properly");
      }
    }
      , error => this.errorMsg = error);

      // this._rdcService.getAllfiles().subscribe(data => {
      //   if (data) {
      //   console.log(data);
      //   }
      //   else {
      //     console.log("File not uploaded properly");
      //   }
      // }
      //   , error => this.errorMsg = error);
      // var directory =  "/assets/speedtest.json"
      // var xmlHttp = new XMLHttpRequest();
      // xmlHttp.open('GET', directory, false); // false for synchronous request
      // xmlHttp.send(null);
      // var ret = xmlHttp.responseText;
      // var fileList = ret.split('\n');
      // console.log(fileList);
      
      // for ( var i = 0; i < fileList.length; i++) {
      //     var fileinfo = fileList[i].split(' ');
      //     if (fileinfo[0] == '201:') {
      //         document.write(fileinfo[1] + "<br>");
      //         document.write('<img src=\"' + directory + fileinfo[1] + '\"/>');
      //     }
      // }


      // const fs = this._fsService.fs as any;
      // fs.readdir("/dashboard", function (err, items) {
      //    if (err) {
      //       return;
      //    }
      //    for (let i = 0; i < items.length; i++) {
      //      console.log(items[i]);
      //    }
      // });
  }
  showSpeedTestData(speedtestData) {
    console.log(speedtestData.log.entries);
    speedtestData.log.entries.forEach(item => {
      item.request.url = item.request.url.split('?')[0];
    });
    this.speedtestData = speedtestData.log.entries;
    this.pageDT = speedtestData.log.pages[0].startedDateTime;
  }
  showJSONDATA(data) {
    console.log(data);
    this.show = true;
    this.modaldata = data;
  }
}
