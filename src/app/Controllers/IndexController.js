class IndexMain {
    constructor() {
        this.$header = $("#header")
        this.$iFeelBad = $("#btn-I-feel-bad");
        this.$iJustWantAHug = $("#btn-I-just-want-a-hug");
        this.$yingyang = $("#yinyang");
        this.$words = $("#words");
        this.updateHTML();
        this.buildResponsive();
    }

    updateHTML() {

    }

    buildResponsive() {

        this.$iFeelBad.on("click", () => {
            let opacity = this.$yingyang.css("opacity");
            let newOpacity = opacity * 1.2;
            if (newOpacity > 1.0) { newOpacity = 1.0;}
            this.$yingyang.css("opacity", newOpacity);
            this.$words.text("That's okay.");
        });

        this.$iJustWantAHug.on('click', () => {
            this.$yingyang.css("opacity", 1.0);
        })
    }

    fade() {

    }
}