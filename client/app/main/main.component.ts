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

public currRepeat: CurrentRepeat = new CurrentRepeat("PL");

//repeatArr: Array<Repeat> = [];
repeatArr: Array<CurrentRepeat> = []
answered: boolean = false;
passwd: string = "";
auth: boolean = false;


synth = window.speechSynthesis;
voices=window.speechSynthesis.getVoices()
selectedVoice : any;
  constructor(private mainService: MainService, http:Http) {

    mainService.getRepeat().subscribe(res => {
      
      for(let r of res){
        console.log(r.id)
        //do tabeli repeatArr trafiają pozycje które będą wyświetlane, jeden obiekt z bazy moze być wyświetlany 2 razy, jako pl i eng,
        //konstruktor CurrentRepeat to określa
           if(r.plAnsCountToNext <=0){
                  this.repeatArr.push(new CurrentRepeat("PL",r));
           }
           if(r.engAnsCountToNext <=0){
                  this.repeatArr.push(new CurrentRepeat("ENG",r));
           }
      }
      this.currRepeat =this.repeatArr[0];
    }) 
    //console.log(this.repeatArr[0])
  //  return;
    //
};

setRep = function(){

}




showAnswear = function(){
this.answered = true;
}


UpdateAndSetNext = function(state:string){
      //algorytm kolejnej powtórki
      console.log(this.currRepeat.goodAnsCount)
      var nextRep:number=0;
      var reset:boolean = false;//reset poprawnych odp z rzedu
      if(state==="known"){
        //jezeli wiem biore liczbe poprawnych odpowiedzi z rzedu i mnorze razy 2
        if(!this.currRepeat.goodAnsCount){
          nextRep=1;
        }else{
          nextRep=this.currRepeat.goodAnsCount*2
        }
      }else if(state==="almost"){
        //jezeli prawie wiem - powtarzam za dwa dni i resetuje poprawne odp z rzedu
          nextRep=this.currRepeat.goodAnsCount+2
          reset = true;
      }else if(state==="no"){
        //jezeli nie wiem to powtarzam do skutku i resetuje licznik poprawnych odp
        nextRep=0
        reset = true;
      }
console.log(nextRep)


    var repUpd={};
    if(this.currRepeat.lang === "PL"){
      repUpd['plAnsCountToNext'] = nextRep;
      if(reset){
        repUpd['plGoodAnsCount'] = 0;
      }else{
        repUpd['plGoodAnsCount'] = this.currRepeat.goodAnsCount+1;
      }
    }else if(this.currRepeat.lang === "ENG"){
      repUpd['engAnsCountToNext'] = nextRep;
      if(reset){
        repUpd['engGoodAnsCount'] = 0;
      }else{
        repUpd['engGoodAnsCount'] = this.currRepeat.goodAnsCount+1;
      }
    }else{
      console.log("Wyjątek - nie wiem który język");
    }

    if(auth){
      console.log(this.repUpd);
      this.mainService.updateItem(this.currRepeat.id,repUpd)
                .subscribe(res => console.log(res));
    }
      this.repeatArr.shift();
      this.answered = false;
      this.currRepeat = this.repeatArr[0];
  }
  
speak(): void {
    let synth: any;

    console.log(this.selectedVoice);
    

    synth = new SpeechSynthesisUtterance();
    synth.voice = this.selectedVoice;
    synth.rate = 0.7;
    synth.text = this.currRepeat.repeat
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

//klasa reprezentować będzie aktualną pozycję, repeat i answear są uniwersalne - tzn 
//mogą przyjąć polskie i angielskie wartości, o tym który jesyk mowi lang
class CurrentRepeat{
  
  desc:string;
  id:any;
  lang:string;
  
  repeat: string;
  answear:string;
  goodAnsCount:number;//ilość dobrych odpowiedzi z rzędu

 /* constructor(repeat?:string,answear?:string,id?:any,lang?:string,goodAnsCoun?:number){
    this.repeat = repeat || "Loading..."
    this.answear = answear || "",
    this.id = id || "",
    this.lang = lang,
    this.goodAnsCoun = goodAnsCoun || 0
  };*/
  constructor(lang:string,repObj?:Repeat){
    if(!repObj){
        this.repeat="Loading..."
      return;
    }
    this.lang = lang;
    this.id = repObj._id;
    this.desc = repObj.description;
    if(lang ==="ENG"){
          this.repeat=repObj.engPhrase
          this.answear=repObj.plPhrase
          this.goodAnsCount=repObj.plGoodAnsCount || 0
    }else if(lang === "PL"){
          this.repeat=repObj.plPhrase
          this.answear=repObj.engPhrase
          this.goodAnsCount=repObj.engGoodAnsCount || 0
    }else{
      alert("nie prawidłowy currentRepeat")
    }
}}