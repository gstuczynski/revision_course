import { Injectable } from '@angular/core';
import {Http, Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()

export class MainService{

constructor(private http: Http){}

  getRepeat(){
  return this.http.get('/api/itemsToday')
    .map(res =>res.json());
}





updateItem(id:any,rep:any){

console.log("serwis:")
console.log(rep)

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var url = "/api/itemupAfterAnsw/"+id;
   //var url =  "/api/itemup/"+id
    console.log(url)
//JSON.stringify(rep)
    return this.http.put(url,rep , {headers: headers})
            .map(res =>
            console.log(res))
              .catch(this.handleError);
}

 public handleError(error: Response) {
    console.error(error);
    console.log(error.json().error)
    return Observable.throw(error.json().error || 'Server error');
  }
}


