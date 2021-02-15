import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RdcService {

  // private _url = "/assets/data/rdc.json";
  //private _urlspeedtest = "https://rajurajak.github.io/spdtest/assets/speedtest.json"
  private _urlspeedtest =  "/assets/speedtest.json";

  constructor(private http: HttpClient) { }
  // getAllfiles(): Observable<any[]> {
  //   return this.http.get<any[]>('/assets/')
  //     .pipe(
  //       retry(3),
  //       catchError(this.handleError1)
  //     );
  // }
  // handleError1(error: HttpErrorResponse) {
  //   return throwError(error.message || "Server Error")
  // }
  //this.http.get('assets/').subscribe(data => console.log(data)); 
  getAllApiSpeed(): Observable<any[]> {
    return this.http.get<any[]>(this._urlspeedtest)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }
  uploadFile(fileToUpload: File): Observable<any[]> {
    const endpoint = '/assets/';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post<any[]>(endpoint, formData)
      .pipe(
          
        catchError(this.handleError1)
      );
  }
  handleError1(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }
}
