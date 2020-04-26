

let sliderContainer = document.querySelector('.slider-container'),
    sliderContent = document.querySelector('.slider-content'),
    slidesNumber = sliderContent.children.length + 2,
    slideSize,
    slideTranslate,

    prevBtn = document.querySelector('.prevBtn'),
    nextBtn = document.querySelector('.nextBtn'),

    pagger = document.querySelector('.pagger ul'),
    currentSlide = 1;
    

    let slideCopy = sliderContent.children[slidesNumber-3].cloneNode(true);
    sliderContent.insertBefore(slideCopy,sliderContent.children[0]);

    slideCopy = sliderContent.children[1].cloneNode(true);

    sliderContent.appendChild(slideCopy);

    

    pagger.children[0].classList.add('activePagger');
    
    

    function sliderInit (widthx,heightx) {

        if (widthx == undefined) {
        
            widthx = window.innerWidth;
            sliderContainer.style.width = widthx+'px';
            
        }else{

            sliderContainer.style.width = widthx+'px';
        }
        
        
        if (heightx == undefined) {
            heightx = window.innerHeight;
            sliderContainer.style.height = heightx+'px';
            
        }else{

            sliderContainer.style.height = heightx+'px';
        }

        document.querySelector('.left-control').style.top = (heightx/2)+'px'
        document.querySelector('.right-control').style.top = (heightx/2)+'px'

        document.querySelector('.pagger').style.top = (heightx - (heightx/10))+'px'
        document.querySelector('.pagger').style.left = ((widthx/2) - (document.querySelector('.pagger').clientWidth/2))+'px'

        slideSize = sliderContent.clientWidth;
        slideTranslate = slideSize;

        

    };

    sliderInit ();
    window.onresize = function(){
        sliderInit ();
    };
    

    sliderContent.style.transition = 'none';

    sliderContent.style.transform = 'translateX('+(-slideSize)+'px)';


    nextBtn.onclick = function () {

        currentSlide++;

        slideTranslate += slideSize;

        sliderContent.style.transition = 'transform 0.5s ease-in-out';

        pagger.children[currentSlide-2].classList.remove('activePagger');
        
        sliderContent.style.transform = 'translateX('+(-slideTranslate)+'px)';

        if (currentSlide >= slidesNumber-1) {

            pagger.children[0].classList.add('activePagger');
        }else{

            pagger.children[currentSlide-1].classList.add('activePagger');
        }
        

    };

    prevBtn.onclick = function (){

        currentSlide--;

        slideTranslate -= slideSize;

        sliderContent.style.transition = 'transform 0.5s ease-in-out';

        pagger.children[currentSlide].classList.remove('activePagger');

        sliderContent.style.transform = 'translateX('+(-slideTranslate)+'px)';

        if (currentSlide == 0) {

            pagger.children[slidesNumber - 3].classList.add('activePagger');
        }else{

            pagger.children[currentSlide-1].classList.add('activePagger');
        }
    };

    sliderContent.addEventListener('transitionend', ()=>{

        slideCheck();

    });

    
    function slideCheck(){

        if (currentSlide === (slidesNumber-1)) {

            currentSlide = 1;
            slideTranslate = slideSize;
            sliderContent.style.transition = 'none';
            sliderContent.style.transform = 'translateX('+(-slideTranslate)+'px)';

        }else if (currentSlide === 0){

            currentSlide = slidesNumber-2;
            slideTranslate = currentSlide * slideSize;
            sliderContent.style.transition = 'none';
            sliderContent.style.transform = 'translateX('+(-slideTranslate)+'px)';
        }

    }

    Array.from(pagger.children).forEach((item)=>{

        item.onclick = function () {

            sliderContent.style.transition = 'transform 0.5s ease-in-out';

            Array.from(pagger.children).forEach((item)=>{

                item.classList.remove('activePagger');
            });
                
            pagger.children[this.getAttribute('index')].classList.add('activePagger');

            currentSlide = parseInt(this.getAttribute('index')) +1;
            
            slideTranslate = currentSlide * slideSize;
            sliderContent.style.transform = 'translateX('+(-slideTranslate)+'px)';
            
        };

    });


