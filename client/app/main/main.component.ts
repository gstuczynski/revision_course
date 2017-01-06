import { Component } from '@angular/core';
import { MainService } from './main.service'
import {Http} from '@angular/http';
import { auth } from '../app.component'
import {Repeat} from '../repeat'

@Component({
  selector: 'main',
   moduleId: module.id,
  templateUrl: './main.component.html',
   providers: [MainService]
})

export class MainComponent {

currRepeat: CurrentRepeat = new CurrentRepeat();
repeatArr: Array<Repeat> = [];
answered: boolean = false;
passwd: string = "";
auth: boolean = false;


synth = window.speechSynthesis;
voices=window.speechSynthesis.getVoices()
selectedVoice :any;

  constructor(private mainService: MainService, http:Http) {
    mainService.getRepeat().subscribe(res => {
      for(let r of res){
        this.repeatArr.push(new Repeat(r.engPhrase, r.plPhrase, r.description,
                        r._id, r.plAnsCount, r.engAnsCount))
      }
      if(this.repeatArr[0].plAnsCount===0){
        this.currRepeat = new CurrentRepeat(this.repeatArr[0].plPhrase,this.repeatArr[0].engPhrase,this.repeatArr[0].id);
      }else{
          this.currRepeat = new CurrentRepeat(this.repeatArr[0].engPhrase,this.repeatArr[0].plPhrase,this.repeatArr[0].id);
      }
    }) 
};

setRep = function(){

}




showAnswear = function(){
console.log(this.passwd);
this.answered = true;
}


setNextRepeat = function(rep:Repeat, nextDay:number){
/**nextDay to ilosc dni do kolejnej powtorki
 * przeliczam dzien nastepnej powtorki i 
 * wrzucam do bazy jako item.nextrepeat
 */

r
if(auth){
  this.mainService.updateItem(item).subscribe(data =>{});
}
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

//klasa reprezentować będzie aktualną pozycję, repeat i answear są uniwersalne
class CurrentRepeat{
  repeat: string;
  answear:string;
  id:any;
  constructor(repeat?:string,answear?:string,id?:any){
    this.repeat = repeat || "Loading..."
    this.answear = answear || "",
    this.id = id || ""
  };
}