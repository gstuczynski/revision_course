import { Component } from '@angular/core';
import { MainService } from './main.service'

@Component({
  selector: 'main',
   moduleId: module.id,
  templateUrl: './main.component.html',
   providers: [MainService]
})
export class MainComponent  {



items: Array<any> = [];
answered: boolean = false;
item:{};



  constructor(private mainService: MainService) {
    mainService.getItems().subscribe(res => {
      this.items = res;
    })
}


showAnswear = function(){
this.answered = true;
}


knew = function(item, nextDay:number){

//var updItem = item;

var date = new Date();
//item.creationDate.setDate(date.getDate()+5)
item.nextRepeat = new Date();
console.log(item.nextRepeat);
this.mainService.updateItem(item);
this.items.shift();
}
  





}
