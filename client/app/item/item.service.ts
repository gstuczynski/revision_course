import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ItemService{

constructor(private http: Http){}

  addItem(item){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("/api/item", JSON.stringify(item), {headers: headers})
      .map(response => response.json());
  }


  getItems(){
  return this.http.get('/api/item')
    .map(res =>res.json());
}


removeItem(id){
  return this.http.delete("/api/items/"+ id)
        .map(res => res.json());
}


}