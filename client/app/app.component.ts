import { Component } from '@angular/core';
import { AppService } from './app.service'
import {Http} from '@angular/http';

@Component({
  selector: 'my-app',
   moduleId: module.id,
  templateUrl: './app.component.html',
  providers: [AppService]
})

export class AppComponent  {

authmsg: String = `Czekam na autoryzację`
  passwd: String = "";
  auth: boolean = false;

  constructor(private appService: AppService, http:Http) {

    appService.getPasswd().subscribe(res => {
      //sprawdzam czy hasło dobre
      this.passwd = String(res);
     const userPass = prompt("Podaj Hasło");
     if(userPass === this.passwd){
       this.authmsg = "Hasło poprawne, wprowadzane zmiany będą zapisywane do bazy danych!";
       auth = true;
       
     }else{
       this.authmsg = "Hasło niepoprawne, wprowadzane zmiany nie będą zapisywane w bazie danych!";
     }
    })


};

 }
export var auth = this.auth;