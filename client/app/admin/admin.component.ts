import { Component } from '@angular/core';
import { AdminService } from './admin.service'

@Component({
  selector: 'admin',
   moduleId: module.id,
  templateUrl: 'admin.component.html',
      providers: [AdminService]
})
export class AdminComponent  { 


items: Array<any> = [];
engPhrase: string;
plPhrase: string;
description: string;
creationDate: Date;
id:any;
nextRepeat: Date;

  constructor(private adminService: AdminService) {
    adminService.getItems().subscribe(res => {
      this.items = res;
    })
}
  addItem() {
    if(!this.nextRepeat || this.nextRepeat == undefined){
      this.nextRepeat = new Date();
      console.log("if "+this.nextRepeat)
    }

    var item = {
      engPhrase: this.engPhrase,
      plPhrase: this.plPhrase,
      description: this.description,
      nextRepeat: this.nextRepeat
    }

    console.log("nr: "+this.nextRepeat);
    // jezeli jest id to znaczy ze jestm w trybie edycji i uruchamian serwis
    //do update, przeciwnie instert do bazy
    if(this.id){
      console.log("wlaz w update");
      
      item._id = this.id   
      this.adminService.updateItem(item).subscribe(data => {
      console.log(data)
    });
  }else{



    this.adminService.addItem(item).subscribe(data => {
      console.log(data);
      this.items.push(item);
    })
  }
  }


removeItem(id){
  this.adminService.removeItem(id)
  .subscribe(data =>{
    console.log("delete "+data)
  })
}
editItem(item){
this.engPhrase = item.engPhrase;
this.plPhrase = item.plPhrase;
this.description = item.description;
this.id = item._id;
}




}
