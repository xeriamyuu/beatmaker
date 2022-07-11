class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.currentKick = "./allSounds/kick-classic.wav";
        this.currentSnare = "./allSounds/snare-acoustic01.wav";
        this.currentHihat = "./allSounds/hihat.acoustic01.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.play = document.querySelector('.Play');
        this.index = 0 ;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects= document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8 ;
        const activeBars = document.querySelectorAll(`.b${step}`)
        activeBars.forEach(bar => {
            bar.style.animation= `playTrack 0.3s alternate ease-in-out`
            if(bar.classList.contains('active')){
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime=0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.play();
                    this.snareAudio.currentTime=0;
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.play();
                    this.hihatAudio.currentTime=0;
                }
            }
        })
        this.index++;
        
        
    }
    start(){
        const interval = (60/this.bpm)*1000;
        if(!this.isPlaying){
        this.isPlaying = setInterval(() => {
            this.repeat();
        }, interval);
    } else {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
    }
}
    updateBtn() {
        if(!this.isPlaying) {
            this.play.innerText = "Stop";
            this.play.classList.add("active");
        } else {
            this.play.innerText = "Play";
            this.play.classList.remove("active");
        }
    }

    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src=selectionValue;
            case "snare-select":
                this.snareAudio.src=selectionValue;
            case "hihat-select":
                this.hihatAudio.src=selectionValue;
        }
    }

    mute(e) {
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0 ;
                    break; 
                case "1":
                    this.snareAudio.volume = 0 ;
                    break;
                case "2":
                    this.hihatAudio.volume = 0 ;
                    break;  
            } 
        } else {
            switch(muteIndex){
            case "0":
                this.kickAudio.volume = 1 ;
                break; 
            case "1":
                this.snareAudio.volume = 1 ;
                break;
            case "2":
                this.hihatAudio.volume = 1 ;
                break;  
            }
        }
    }
    changeTempo(e){
        const tempoText = document.querySelector('.tempo-nr');
        
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.Play');
        if(playBtn.classList.contains('active')){
            this.start();
        }

    }
        
    }

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener('animationend', function() {
        this.style.animation = "";
    });
});

drumKit.play.addEventListener('click', function() {
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e) {
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);

});

drumKit.tempoSlider.addEventListener('change', function(e){
    drumKit.updateTempo(e);

});
