export default class Accordion {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
    }

    init() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                if (trigger.closest('.module__info-show').nextElementSibling.style.display === 'block') {
                    trigger.closest('.module__info-show').nextElementSibling.style.display = 'none';
                } else {
                    trigger.closest('.module__info-show').nextElementSibling.style.display = 'block';
                    trigger.closest('.module__info-show').nextElementSibling.classList.add('animated', 'fadeInDown');
                }
            });
        });
    }
}