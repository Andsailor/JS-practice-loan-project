import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(trigger, animation) {
        super(trigger, animation);
        try {
            this.prevModule = document.querySelectorAll('.prevmodule');
            this.nextModule = document.querySelectorAll('.nextmodule');
        } catch(e) {}
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.add('animated', this.animation);
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
        try {
            if (this.slides[this.slideIndex - 1].matches('.modules')) {
                setTimeout(function() { 
                    document.querySelector('.hanson').classList.add('animated', this.animation);
                    document.querySelector('.hanson').style.display = 'block';
                }, 3000);
            } else {
                document.querySelector('.hanson').style.display = 'none';
            }
        }
        catch(e) {
        }       
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);   
    }

    bindTrigger() {
        this.trigger.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });
    
        this.showSlides(this.slideIndex);

        this.prevModule.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });

        this.nextModule.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }

    render() {
        if (this.container) {
            this.bindTrigger();
        } 
    }
}