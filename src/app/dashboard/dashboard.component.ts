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
  public showScreenshots = true;
  public speedtestData =[];
  public errorMsg;
  public SiteName;
  public siteUrl;
  public httpversion;
  public pageDT;
  public modaldata;
  public  json;
  constructor(private _rdcService: RdcService) { }
  ngOnInit() {
    document.getElementById('files').addEventListener('change', this.handleFileSelect, false);
    this._rdcService.getAllApiSpeed().subscribe(data => {
      if (data) {
      //  this.showSpeedTestData(data);
      }
      else {
        console.log("File not uploaded properly");
      }
    }
      , error => this.errorMsg = error);

  }


  selectFile($event){
   console.log($event.target.files[0]);
   var file:File = $event.target.files[0];
   const blob = new Blob([$event.target.files[0]], {type:"application/json"});
    var myReader:FileReader = new FileReader();
    myReader.onloadend = function(e){
      console.log(myReader.result);
    }
    myReader.readAsText(blob);
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
handleFileSelect(evt) {
  localStorage.removeItem('speedtestData');
	var files = evt.target.files; // FileList object
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();
	 reader.onload = (function (theFile) {
			return function (e) {
				try {
					this.json = JSON.parse(e.target.result);
          this.json.log.entries.forEach(item => {
              item.request.headers = [];
              item.request.cookies = [];
              item.request._initiator = [];
              item.request.url = item.request.url.split('?')[0];
          });
          this.json=  this.json.log.entries.filter(item=> item._resourceType == 'xhr');
          localStorage.setItem("speedtestData", JSON.stringify(this.json));
          console.log(this.speedtestData);
        } catch (ex) {
					alert('ex when trying to parse json = ' + ex);
				}
			}
		})(f);
		reader.readAsText(f);
	}
}
showDATA(){
  this.speedtestData =  JSON.parse(localStorage.getItem('speedtestData'));
  console.log( this.speedtestData);
}
}
