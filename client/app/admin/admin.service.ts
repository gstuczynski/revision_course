import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class AdminService{

constructor(private http: Http){}

  addItem(item){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("/api/item", JSON.stringify(item), {headers: headers})
      .map(response => response.json());
  }


  getItems(){
  return this.http.get('/api/items')
    .map(res =>res.json());
}


removeItem(id){
  return this.http.delete("/api/item/"+ id)
        .map(res => res.json());
}


updateItem(item){
console.log(item);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(item);
    
    return this.http.put("/api/itemup/"+item._id, JSON.stringify(item), {headers: headers})
      .map(response => response.json());
}


}