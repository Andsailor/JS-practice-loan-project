import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/mini-slider';
import VideoPlayer from './modules/playVideo';
import Differences from './modules/differences';
import Form from './modules/form';
import Accordion from './modules/accordion';
import Download from './modules/download';


window.addEventListener('DOMContentLoaded', () => {

    // Sliders section
    const mainSlider = new MainSlider({
        container: '.page', 
        trigger: '.next',
        animation: 'fadeIn'
    });
    mainSlider.render();

    const moduleSlider = new MainSlider({
        container:'.moduleapp',
        trigger: '.next',
        animation: 'fadeIn'
    });
    moduleSlider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        next: '.showup__next',
        previous: '.showup__prev',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        next: '.modules__info-btns .slick-next',
        previous: '.modules__info-btns .slick-prev',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        next: '.feed__slider .slick-next',
        previous: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    // The difference block
    const oldDiff = new Differences('.officerold', '[old]');
    oldDiff.render();
    
    const newDiff = new Differences('.officernew', '[new]');
    newDiff.render();

    // YouTube API player
    new VideoPlayer('.showup .play','.overlay').init();
    new VideoPlayer('.module__video-item .play','.overlay' ).init();

    // Forms with POST requests
    new Form().initForm();

    // Accordion
    new Accordion('.module__info-show .plus').init();

    // Link 
    new Download('.download').init();
});