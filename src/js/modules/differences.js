export default class Differences {
    constructor(container, trigger) {
        this.container = document.querySelector(container);
        this.trigger = document.querySelector(trigger);
        try {this.blocks = this.container.children;} catch(e) {}
    }

    hideCards() {
        this.blocks.forEach(block => {
            block.style.display = 'none';
        });
        this.blocks[0].style.display = 'block';
        this.blocks[this.blocks.length - 1].style.display = 'flex';
    }

    showCards(n) {
        this.blocks.forEach(block => {
            block.classList.add('animated');
        });
        this.blocks[n].style.display = 'flex';
        this.blocks[n].classList.add('fadeInDown');
    }


    render() {
        try {
            let i = 1;
            this.hideCards();
            this.trigger.addEventListener('click', () => {
                this.showCards(i);
                i++;
                if (i == this.blocks.length - 1) {
                    this.blocks[this.blocks.length - 1].classList.add('fadeOutDown');
                }
             });
        } catch(e) {}
    }
}