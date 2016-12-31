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

updateItem(item){
  console.log("servis"+item.nextRepeat);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put("/api/items/"+item.id, JSON.stringify(item), {headers: headers})
      .map(response => response.json());
}

}