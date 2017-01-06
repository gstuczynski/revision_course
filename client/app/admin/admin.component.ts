import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service'
import { auth } from '../app.component'
import {Repeat} from '../repeat'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import {Control} from "@angular/common"

@Component({
  selector: 'admin',
   moduleId: module.id,
  templateUrl: 'admin.component.html',
      providers: [AdminService]
})
export class AdminComponent implements OnInit { 



repeatArr: Array<Repeat> = [];
engPhrase: string;
plPhrase:string;
description: string;
creationDate: Date;
plAnsCount: number;
engAnsCount: number;
currRepeat: Repeat



  constructor(private adminService: AdminService, private fb: FormBuilder) {}
ngOnInit(){
  //przy załadowaniu tworze obiekty dla kazdej wartosci z bazy i wrzucam w tablice
    this.adminService.getRepeat().subscribe(res => {
      for(let r of res){
        this.repeatArr.push(new Repeat(r.engPhrase, r.plPhrase, r.description,
                        r._id, r.plAnsCount, r.engAnsCount))
      }
    })
this.currRepeat = new Repeat("","","");
}



  addRepeat(){
 
    if(!auth){
      if(!this.currRepeat.id){
        this.currRepeat.id = "new";
        this.repeatArr.push(this.currRepeat);
        return;
      }
    }else{
      if(this.currRepeat.id){   
        this.adminService.updateRepeat(this.currRepeat).subscribe(data =>
        console.log(data));  
      }else{
        
        this.repeatArr.push(this.currRepeat);
     //   console.log(this.currRepeat)
        this.adminService.addRepeat(this.currRepeat).subscribe(data =>
        this.currRepeat.id = data._id
        )
      }
    } 
    this.currRepeat = new Repeat("","")
  }

removeRepeat(rep:Repeat){
//es6 funkcja zwrotna zwraca tylko to co spelnia warunek
  this.repeatArr = this.repeatArr.filter(obj => obj.id!=rep.id);
  this.adminService.removeRepeat(rep.id)
  .subscribe(data =>{
   // console.log("delete "+data)
  })
}
editRepeat(current:Repeat ){
this.currRepeat = current;
}


saveAllChanges(){
    for(let r of this.repeatArr){
      console.log(r)
      this.repeatArr[2].engPhrase = "dupaduapa"
      this.adminService.updateRepeat(r).subscribe(data =>
      console.log(data));  
    }
}



}
