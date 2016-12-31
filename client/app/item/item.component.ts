import {Component} from '@angular/core';
import { ItemService } from './item.service'



@Component({
  selector: 'item',
  moduleId: module.id,
  templateUrl: 'item.html',
    providers: [ItemService]
})
export class ItemComponent{

items: Array<any> = [];
engPhrase: string;
plPhrase: string;
description: string;
creationDate: Date;

  constructor(private itemService: ItemService) {
    itemService.getItems().subscribe(res => {
      this.items = res;
    })
}
  addItem() {
    var item = {
      engPhrase: this.engPhrase,
      plPhrase: this.plPhrase,
      description: this.description

    }
    this.itemService.addItem(item).subscribe(data => {
      console.log(data);
      this.items.push(item);
    })
  }


removeItem(id){
  this.itemService.removeItem(id)
  .subscribe(data =>{
    console.log("delete "+data)
  })
}



}