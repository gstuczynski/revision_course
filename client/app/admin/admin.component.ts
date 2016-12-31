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

  constructor(private adminService: AdminService) {
    adminService.getItems().subscribe(res => {
      this.items = res;
    })
}
  addItem() {
    var item = {
      engPhrase: this.engPhrase,
      plPhrase: this.plPhrase,
      description: this.description

    }
    this.adminService.addItem(item).subscribe(data => {
      console.log(data);
      this.items.push(item);
    })
  }


removeItem(id){
  this.adminService.removeItem(id)
  .subscribe(data =>{
    console.log("delete "+data)
  })
}





}
