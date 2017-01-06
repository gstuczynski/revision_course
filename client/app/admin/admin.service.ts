import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import {Repeat} from '../repeat'
import 'rxjs/add/operator/map';


@Injectable()

export class AdminService{

constructor(private http: Http){}

  addRepeat(repeat:Repeat){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("/api/item", JSON.stringify(repeat), {headers: headers})
      .map(response => response.json());
  }


  getRepeat(){
  return this.http.get('/api/items')
    .map(res =>res.json());
}


removeRepeat(id:any){
  return this.http.delete("/api/item/"+ id)
        .map(res => res.json());
}


updateRepeat(repeat:Repeat){

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    
    return this.http.put("/api/itemup/"+repeat.id, JSON.stringify(repeat), {headers: headers})
      .map(response => response.json());
}


}