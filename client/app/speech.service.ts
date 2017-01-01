

export class MainService{}

speechSynthesis: any = speechSynthesis.getVoices();
voices = speechSynthesis.getVoices();
i: number;




  for(i = 0; i < voices.length ; i++) {

    var v = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }




