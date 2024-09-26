const liSelector= document.querySelectorAll('.liHeader');
const buttonSelection= document.getElementById('buttonInitPag');
const checkAndroidPanel=document.getElementById('checkMenu');
const checkSelectorList=document.getElementById('listArticle').querySelector('.disableDisplay');
var lastScroll;

function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
      return;
    }
    document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function(){
    checkAndroidPanel.checked=false;
    window.onresize = function (){
        if(screen.width>=1069 && checkAndroidPanel.checked)
            {
                checkSelectorList.classList.add('disableDisplay');
                checkAndroidPanel.checked=false;

            }
     }

     lastScroll=0;

     window.addEventListener('scroll',function(){

        if(ScrollDelta(this)==-1)
        {
            if(this.window.scrollY>604 && this.window.scrollY<700)
            {
                var oldScroll=this.window.scrollY,maxSroll=1328;
                LerpFuncion(oldScroll,maxSroll,this);

            } 
        }

        else if(ScrollDelta(this)==1)
        {
            if(this.window.scrollY>604 && this.window.scrollY<500)
                {
                } 
        }

     })
  })

  checkAndroidPanel.addEventListener('change',()=>{
    if(checkAndroidPanel.checked)
        {
            checkSelectorList.classList.remove('opacityControl');
            setTimeout(() => {
                checkSelectorList.classList.remove('disableDisplay');
              },360);
        } 
    else
    {
        checkSelectorList.classList.add('opacityControl');
        checkSelectorList.classList.add('disableDisplay');
    } 
  })


function enablePagResumen(objetList)
{
    objetList.forEach(elementInitElable=>{
        elementInitElable.classList.remove('animationInicialOut');
    })

}

buttonSelection.addEventListener('click', function(){
    const initPagElim=  document.getElementById('contentInitMenu');
    initPagElim.classList.add('panelElable');
    const  arrayInitComponent= document.querySelectorAll('.animationInicialOut');
    document.getElementById('contentInitMenu').classList.remove('initAnimationIn');
    
    setTimeout(() => {
        enablePagResumen(arrayInitComponent);
      }, 500);


    })


liSelector.forEach(thumb =>{

    thumb.addEventListener('click', function(){

        if(!this.querySelector('.hidden')&& !this.querySelector('.textLetterColorDisable')){
            
            // Elimina las clases ocultas actuales

            const imgDisable= document.querySelector('.hidden');
            imgDisable.classList.remove('hidden');

            const imgTextDisable= document.querySelector('.textLetterColorDisable');
            imgTextDisable.classList.remove('textLetterColorDisable');


            //Añade clases ocultas a nuevos objetos

            const newImageDisable= this.querySelector('.activeImageSelector');
            newImageDisable.classList.add('hidden');

            const newImgTextDisable= this.querySelector('.textLetterColor');
            newImgTextDisable.classList.add('textLetterColorDisable');

            switch(newImgTextDisable.textContent)
            {
                case('Inicio'):
                location.reload();
                break;

                case('Resumen'):

                break;

                case('Skills'):

                break;

                case('Proyectos'):

                break;

                case('Contacto'):

                break;
            }

        }
    })
})


function ScrollDelta(scrollWindows)
{
    if(lastScroll==0) lastScroll= scrollWindows.window.scrollY;

    var newScroll= scrollWindows.window.scrollY;

    var scrollDeltavar= (lastScroll>=newScroll)? 1:-1;

    lastScroll=this.window.scrollY;

    return scrollDeltavar;
}

function LerpFuncion(oldScroll,maxSroll,realScroll)
{
    document.body.classList.add('stopScrolling');
    var temValue=0;
    while(temValue<1)
    {
        realScroll.window.scrollTo(realScroll.window.scrollX, Lerp(oldScroll,maxSroll,temValue));
        temValue+=0.1;
    }
    document.body.classList.remove('stopScrolling');
        
}

function Lerp(min, max, value) {
	return (max - min) * value+ min;
}





