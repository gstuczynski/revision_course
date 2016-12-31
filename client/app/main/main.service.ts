import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class MainService{

constructor(private http: Http){}

  getItems(){
  return this.http.get('/api/item')
    .map(res =>res.json());
}

}