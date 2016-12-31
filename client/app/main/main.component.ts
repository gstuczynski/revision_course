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



  constructor(private mainService: MainService) {
    mainService.getItems().subscribe(res => {
      this.items = res;
    })
}

knew = function(id){
this.items.shift();

}
  





}
