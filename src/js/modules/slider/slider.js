export default class Slider {
    constructor(
        {container = null,
         trigger = null,
         next = null,
         previous = null,
         animation = null,
         activeClass = '',
         animate,
         autoplay} = {}) {

        this.container = document.querySelector(container);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        try {
            this.slides = this.container.children;
        } catch(e) {}
        this.trigger = document.querySelectorAll(trigger);
        this.slideIndex = 1;
        this.animation = animation;
        this.previous = document.querySelector(previous);
        this.next = document.querySelector(next);
    }
}