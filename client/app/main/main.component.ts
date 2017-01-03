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

 synth = window.speechSynthesis;
voices=window.speechSynthesis.getVoices()
selectedVoice :any;

  constructor(private mainService: MainService) {
    mainService.getItems().subscribe(res => {
      this.items = res;
    })
     //synth = window.speechSynthesis;
      //console.log(window.speechSynthesis.getVoices());
}


showAnswear = function(){

  
this.answered = true;
}


setNextRepeat = function(item, nextDay:number){
/**nextDay to ilosc dni do kolejnej powtorki
 * przeliczam dzien nastepnej powtorki i 
 * wrzucam do bazy jako item.nextrepeat
 */

var d = new Date();
d.setDate(d.getDate(d)+nextDay);
item.nextRepeat = d;
this.mainService.updateItem(item).subscribe(data =>{});
this.items.shift();
this.answered = false;
}
  
speak(): void {
    let synth: any;

    console.log(this.selectedVoice);
    

    synth = new SpeechSynthesisUtterance();
    synth.voice = this.selectedVoice;
    synth.rate = 0.7;
    synth.text = this.items[0].engPhrase;
    window.speechSynthesis.speak(synth);
};
onChangeVoice= function(value:any){

for(var i=0;i<this.voices.length;i++){

  if(this.voices[i].name == value){
    this.selectedVoice = this.voices[i];

    return;
  }
}
}

}

