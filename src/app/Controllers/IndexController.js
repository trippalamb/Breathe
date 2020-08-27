var wordsFadeAllowed = true;
var tooMuchCount = 0;

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

    IHateMyself(){

        //play game
        let w = $("#svg-container").width();
        let h = $("#svg-container").height();
        this.svg = d3.select("#svg-container")
                     .append("svg")
                     .attr("id", "counting-container")
                     .attr("width", w)
                     .attr("height", h);

        this.svg.append("circle")
                .attr("cx", w/2)
                .attr("cy", h/2)
                .attr("r", 100)
                .style("stroke", "black")
                .style("fill", "white")
                .style("stroke-width", 4)
                .classed("pointer", true);

        this.svg.append("text")
                .attr("dx", w/2)
                .attr("dy", h/2)
                .classed("pointer", true)
                .style("font-size", 40)
                .text("3");
                

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

