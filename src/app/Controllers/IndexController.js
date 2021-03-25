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
        this.$words.fadeTo(1, 0.0);
        createModal();
    }

    linkHTML(){
        this.$header = $("#header");
        this.$imATerriblePerson = $("#btn-Im-a-terrible-person");
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
        this.$header.css("top", 40);
    }

    buildResponsive() {

        $(window).on("resize", () => {
            this.updateHTML()
        });

        $("#terrible-1").width($("#terrible-1").width());
        $("#terrible-2").width($("#terrible-2").width());

        this.$imATerriblePerson.hover( () => {
            this.ImATerriblePersion();
            //if (typeof (this.timeout) !== "undefined") { clearTimeout(this.timeout); }
            //this.timeout = setTimeout(() => { this.fade(); }, 4000);
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
            this.resetTerrible();
            this.$yinyang.fadeTo(2000, 1.0);
            if(typeof(this.timeout) !== "undefined"){ clearTimeout(this.timeout);}
            this.timeout = setTimeout(() =>{this.fade(); }, 6000);
        });

        this.$imAlreadyPanicked.on('click', () => {
            this.ImAlreadyPanicked();
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
                    this.$counting.attr("hidden", true);
                }
            }, 1800);
        });
    }

    fade() {
        this.$words.fadeTo(2000, 0.0);
        this.$yinyang.fadeTo(4000, 0.0);
    }

    ImATerriblePersion() {

        this.$imATerriblePerson.css("visibility", "hidden").attr("disabled", true);

        var width = $(window).width();
        var height = $(window).height();
        var position = { left: width/2.0, top: height/2.0 };

        var distance = 50;
        var ex = $("#terrible-1").outerWidth() / 2.0 + distance;
        var ey = $("#terrible-1").outerHeight() / 2.0 + distance;

        var $c = $("#container");
        var cp = $c.position();
        var container = {
            left: cp.left,
            top: cp.top,
            right: cp.left + $c.width(),
            bottom: cp.top + $c.height()
        };

        $("#terrible-1").offset(position);

        $("#container").on("mousemove", (e) => {

            var mousePosition = { x: e.pageX, y: e.pageY };
            var btn1 = moveElement("#terrible-1", mousePosition);
            var btn2 = moveElement("#terrible-2", mousePosition);

            $("html").width(width);
            $("html").height(height);
            if (btn1.active) {
                mirrorMovement(btn1, btn2);
            }
            else if (btn2.active) {
                mirrorMovement(btn2, btn1);
            }

        });

        //button run away code

        function mirrorMovement(active, inactive) {
            var p = { top: inactive.top, left: inactive.left };
            var av = false; // adjusted vertically
            var ah = false; // adjusted horizontally
            if (active.top < container.top) {
                p.top = (active.top - container.top) + container.bottom;
                av = true;
            }
            else if (active.bottom > container.bottom) {
                p.top = container.top - (active.h - (active.bottom - container.bottom));
                av = true;
            }

            if (active.left < container.left) {
                p.left = (active.left - container.left) + container.right;
                ah = true;
            }
            else if (active.right > container.right) {
                p.left = container.left - (active.w - (active.right - container.right));
                ah = true;
            }

            if (av && !ah) {
                p.left = active.left;
            }
            else if (!av && ah) {
                p.top = active.top;
            }
            inactive.$el.offset(p)

        }

        function moveElement(selector, mpos) {

            var $el = $(selector);
            var bpos = $el.offset();
            var bw = $el.outerWidth() / 2.0;
            var bh = $el.outerHeight() / 2.0;
            var active = false;

            var cg = {
                x: bpos.left + bw,
                y: bpos.top + bh
            }

            //if mouse is within boundary
            if (isWithinBoundary(cg, mpos)) {

                let next = {};

                let dx = cg.x - mpos.x;
                let dy = cg.y - mpos.y;
                let tht = Math.atan2(dy, dx);
                let r = (ex * ey) / Math.sqrt(ex * ex * Math.pow(Math.sin(tht), 2.0) + ey * ey * Math.pow(Math.cos(tht), 2.0));
                let dr = r - Math.sqrt(dx * dx + dy * dy);
                let dx1 = dr * Math.cos(tht);
                let dy1 = dr * Math.sin(tht);
                cg.x = cg.x + dx1;
                cg.y = cg.y + dy1;
                next.left = cg.x - bw;
                next.top = cg.y - bh;

                $el.offset(next);

                active = true;
            }

            return {
                $el: $el,
                top: bpos.top,
                left: bpos.left,
                bottom: bpos.top + bh * 2.0,
                right: bpos.left + bw * 2.0,
                w: bw * 2.0,
                h: bh * 2.0,
                cgx: cg.x,
                cgy: cg.y,
                active: active
            };
        }

        function isWithinBoundary(cg, p) {
            let n1 = Math.pow(p.x - cg.x, 2.0);
            let n2 = Math.pow(p.y - cg.y, 2.0);
            let d1 = Math.pow(ex, 2.0);
            let d2 = Math.pow(ey, 2.0);
            return ((n1 / d1 + n2 / d2) < 1);
        }
    }

    IFeelBad() {
        this.resetTerrible();
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

        this.resetTerrible();
        this.$counting.attr("hidden", false);
        sequenceCount = 0;

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
            "font-size": cw * 0.4,
            "padding-top": cw *0.18
        }).text(currentCountSequence[sequenceCount++]);
        

        this.$counting.fadeTo(1000, 1.00);                

        if(wordsFadeAllowed){
            this.$words.text(getIHateMyselfPhrase());
            wordsFadeAllowed = false;
            this.$words.fadeTo(2000, 1.0);
            setTimeout(()=>{wordsFadeAllowed = true;}, 2000)
        }

    }

    ItsAllTooMuch() {
        this.resetTerrible();
        if(wordsFadeAllowed){
            this.$words.text(getItsTooMuchPhrase());
            wordsFadeAllowed = false;
            this.$words.fadeTo(2000, 1.0);
            setTimeout(()=>{wordsFadeAllowed = true;}, 2000)
        }
    }

    ImAlreadyPanicked() {

        this.resetTerrible();
        let numBreaths = 5;
        let breathCount = 0;
        let $words = this.$words;
        let $yinyang = this.$yinyang;

        $words.text("Take a deep breath in...");
        wordsFadeAllowed = false;
        $words.fadeTo(2000, 1.0); //fade in words
        
        setTimeout(() => { //once words are faded in trigger sequence
            breathIn();
        }, 2000)

        function breathIn() {
            $("#container").addClass("panic");
            setTimeout(() =>{ $words.fadeTo(2000, 0.0) }, 1000); //words should completely fade out by 3s
            setTimeout(breathOut, 4000); //at 4s call breath out
            $yinyang.fadeTo(4000, 0.0);

            setTimeout(() => { //breath out should fade in by 5s
                $words.text("Take a deep breath out...");
                $words.fadeTo(2000, 1.0);
            }, 3000)
        }

        function breathOut() {
            $("#container").removeClass("panic");
            setTimeout(() => { $words.fadeTo(2000, 0.0) }, 5000); //words should completely fade out by 3s
            
            if (breathCount++ < numBreaths) {
                setTimeout(breathIn, 8000);
                $yinyang.fadeTo(8000, 1.0);
                setTimeout(() => {
                    $words.text("Take a deep breath in...");
                    $words.fadeTo(2000, 1.0);
                }, 7000);
            }
            else {
                breathCount = 0;
                wordsFadeAllowed = true;
            }
        }
    }

    resetTerrible() {
        $("#terrible-1").offset({ left: -500, top: -500 });
        $("#terrible-2").offset({ left: -500, top: -500 });
        this.$imATerriblePerson.css("visibility", "visible").attr("disabled", false);
    }
}


function getIFeelBadPhrase(){
    var r = getRandomInt(3);
    switch(r) {
        case 0:
            return "That's okay.";
            break;
        case 1:
            return "Feeling bad doesn't make you a bad person.";
            break;
        case 2:
            return "This is temporary.";
            break;
        default:
            throw new Error("case number is too high");
    }
}

function getIHateMyselfPhrase(){
    return "Let's count. Just click.";
}

function getCountingSequence() {
    var r = getRandomInt(8);
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
        case 4:
            return ["tre", "due", "uno", "zero"];
            break;
        case 5:
            return ["san", "ni", "ichi", "zero"];
            break;
        case 6:
            return ["21", "13", "8", "5", "3", "2", "1", "1", "0"];
            break;
        case 7:
            return ["128", "64", "32", "16", "8", "4", "2", "1", "0"];
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
            var day = getDayOfWeek((new Date()).getDay());
            return "You can do a " + day + ". You've done a " + day + " before.";
        case 3:
            tooMuchCount++;
            var d = new Date();
            var min = d.getMinutes() + "";
            min = (min.length === 1) ? "0" + min : min;
            return "Right now it is " + d.getHours() + ":" + min + ".";
        default:
            tooMuchCount = 0;
            return getItsTooMuchPhrase();
    }
    var time = today.getHours() + ":" + today.getMinutes();
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

function createModal() {
    const openEls = document.querySelectorAll("[data-open]");
    const closeEls = document.querySelectorAll("[data-close]");
    const isVisible = "is-visible";

    for (const el of openEls) {
        el.addEventListener("click", function () {
            const modalId = this.dataset.open;
            document.getElementById(modalId).classList.add(isVisible);
        });
    }

    for (const el of closeEls) {
        el.addEventListener("click", function () {
            this.parentElement.parentElement.parentElement.classList.remove(isVisible);
        });
    }

    document.addEventListener("click", e => {
        if (e.target == document.querySelector(".modal.is-visible")) {
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });

    document.addEventListener("keyup", e => {
        if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });
}
