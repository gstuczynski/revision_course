import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class AppService{

constructor(private http: Http){}

getPasswd(){
  return this.http.post('/api/passwd',{})
    .map(res =>res["_body"]);
    
}

}