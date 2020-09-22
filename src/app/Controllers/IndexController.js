var wordsFadeAllowed = true;
var tooMuchCount = 0;
var currentCountSequence = [];
var sequenceCount = 0;

class IndexMain {
    constructor() {
        this.haltFade = false;
        this.linkHTML();
        this.updateHTML();
        this.buildResponsive();
    }

    linkHTML(){
        this.$header = $("#header");
        this.$imATerriblePerson = $("#btn-im-a-terrible-person");
        this.$iFeelBad = $("#btn-I-feel-bad");
        this.$iHateMyself = $("#btn-I-hate-myself");
        this.$itsAllTooMuch = $("#btn-Its-all-too-much");
        this.$iJustWantAHug = $("#btn-I-just-want-a-hug");
        this.$imAlreadyPanicked = $("#btn-Im-already-panicked");
        this.$yinyang = $("#yinyang");
        this.$counting = $("#btn-counting");
        this.$words = $("#words");
    }

    updateHTML() {
        let ww = $(window).width();
        let hw = this.$header.width();
        let left = (ww-hw)/2.0;
        this.$header.css("left", left);
    }

    buildResponsive() {

        $(window).on("resize", () => {
            this.updateHTML()
        });

        this.$iFeelBad.on("click", () => {
            this.IFeelBad();
            if(typeof(this.timeout) !== "undefined"){ clearTimeout(this.timeout);}
            this.timeout = setTimeout(() =>{this.fade(); }, 4000);
        });

        this.$iHateMyself.on('click', () =>{
            this.IHateMyself();
            if(typeof(this.timeout) !== "undefined"){ clearTimeout(this.timeout);}
            this.timeout = setTimeout(() =>{this.fade(); }, 4000);
        });

        this.$itsAllTooMuch.on('click', () => {
            this.ItsAllTooMuch();
            if(typeof(this.timeout) !== "undefined"){ clearTimeout(this.timeout);}
            this.timeout = setTimeout(() =>{this.fade(); }, 4000);
        });

        this.$iJustWantAHug.on('click', () => {
            this.$yinyang.fadeTo(2000, 1.0);
            if(typeof(this.timeout) !== "undefined"){ clearTimeout(this.timeout);}
            this.timeout = setTimeout(() =>{this.fade(); }, 6000);
        });

        this.$imAlreadyPanicked.on('click', () =>{
            this.fade();
        });

        this.$counting.on("click", () => {
            this.$counting.fadeTo(1000, 0.00);
            if (typeof (this.sequencetimeout) !== "undefined") { clearTimeout(this.sequencetimeout); }
            this.sequencetimeout = setTimeout(() => {
                this.$counting.find("p").text(currentCountSequence[sequenceCount++]);
                if (sequenceCount <= currentCountSequence.length) {
                    this.$counting.fadeTo(1200, 1.00);
                }
                else {
                    sequenceCount = 0;
                }
            }, 1600);
        });
    }

    fade() {
        this.$words.fadeTo(2000, 0.0);
        this.$yinyang.fadeTo(4000, 0.0);
    }

    IFeelBad(){
        let opacity = getOpacity(this.$yinyang);
        let newOpacity = opacity * 1.2;
        if (newOpacity > 1.0) { newOpacity = 1.0;}
        else if(newOpacity === 0.0){ newOpacity = 0.05};
        this.$yinyang.fadeTo(100, newOpacity);
        if(wordsFadeAllowed){
            this.$words.text(getIFeelBadPhrase());
            wordsFadeAllowed = false;
            this.$words.fadeTo(2000, 1.0);
            setTimeout(()=>{wordsFadeAllowed = true;}, 2000)
        }
    }

    IHateMyself() {

        let w = $(window).width();
        let h = $(window).height();
        let cw = w * 0.2;
        this.$counting.width(cw);
        this.$counting.height(cw);
        this.$counting.css({
            top: h / 2 - cw / 2,
            left: w / 2 - cw / 2
        });

        currentCountSequence = getCountingSequence();
        this.$counting.find("p").css({
            "font-size": cw * 0.5,
            "padding-top": cw *0.1
        }).text(currentCountSequence[sequenceCount++]);
        

        this.$counting.fadeTo(1000, 1.00);                

        if(wordsFadeAllowed){
            this.$words.text(getIHateMyselfPhrase());
            wordsFadeAllowed = false;
            this.$words.fadeTo(2000, 1.0);
            setTimeout(()=>{wordsFadeAllowed = true;}, 2000)
        }



    }

    ItsAllTooMuch(){
        if(wordsFadeAllowed){
            this.$words.text(getItsTooMuchPhrase());
            wordsFadeAllowed = false;
            this.$words.fadeTo(2000, 1.0);
            setTimeout(()=>{wordsFadeAllowed = true;}, 2000)
        }
    }
}


function getIFeelBadPhrase(){
    var r = getRandomInt(2);
    switch(r) {
        case 0:
            return "That's okay.";
            break;
        case 1:
            return "Feeling bad doesn't make you a bad person.";
            break;
        default:
            throw new Error("case number is too high");
    }
}

function getIHateMyselfPhrase(){
    return "Let's count. Just click.";
}

function getCountingSequence() {
    var r = getRandomInt(4);
    switch (r) {
        case 0:
            return ["3","2","1","0"];
            break;
        case 1:
            return ["243", "81", "27", "9", "3", "1", "0"];
            break;
        case 2:
            return ["tres", "dos", "uno", "cero"];
            break;
        case 3:
            return ["10", "9", "7.2", "5.6", "4.8", "3.1", "1.8", "0.6", "0.31", "0"];
            break;
        default:
            throw new Error("case number is too high");
    }
}

function getItsTooMuchPhrase(){
    switch(tooMuchCount){
        case 0:
            tooMuchCount++;
            return "Today is " + getDayOfWeek((new Date()).getDay()) + ".";
        case 1:
            tooMuchCount++;
            return "Today is " + getDayOfWeek((new Date()).getDay()) + ". You can do this.";
        case 2:
            tooMuchCount++;
            var d = new Date();
            return "Right now it is " + d.getHours() + ":" + d.getMinutes() + ".";
        default:
            tooMuchCount = 0;
            return getItsTooMuchPhrase();
    }
    var time = today.getHours() + ":" + today.getMinutes()
}

function getDayOfWeek(n){
    switch(n) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
}

//copy pasted code

function getOpacity($el) {
  var ori = $el.css('opacity');
  var ori2 = $el.css('filter');
  if (ori2) {
    ori2 = parseInt( ori2.replace(')','').replace('alpha(opacity=','') ) / 100;
    if (!isNaN(ori2) && ori2 != '') {
      ori = ori2;
    }
  }
  return ori;
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

