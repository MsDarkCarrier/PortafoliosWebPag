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

        //console.log(this.window.scrollY);
        if(ScrollDelta(this)==-1)
        {    
            var movSelectorDown=0;
            var secPagDirection=GetScrollRealObject(this.window.scrollY,document.getElementById('secondPagTriggerDown').getBoundingClientRect().y)+35;
            var referenceSecPag=(this.window.scrollY>secPagDirection && this.window.scrollY<(secPagDirection+200))?2:0;
            var threePagDirection=GetScrollRealObject(this.window.scrollY,this.document.getElementById('threePagConteiner').getBoundingClientRect().y)+35;
            var refereceThreePag= (this.window.scrollY>threePagDirection && this.window.scrollY<(threePagDirection+100))?3:0;
            movSelectorDown=(referenceSecPag!=0)?referenceSecPag:movSelectorDown;
            movSelectorDown=(refereceThreePag!=0)?refereceThreePag:movSelectorDown;
            console.log(referenceSecPag);

            switch(movSelectorDown)
            {
                case(2):
                EfectElementHeader("skillsId");
                break;

                case(3):
                EfectElementHeader("proyectoId");
                break;
            }


        }

        else if(ScrollDelta(this)==1)
        {

            
            var movSelectorDown=0;
            var secPagDirection=GetScrollRealObject(this.window.scrollY,document.getElementById('firstPagTriggerUp').getBoundingClientRect().y)+150;
            var referenceSecPag=(this.window.scrollY<secPagDirection && this.window.scrollY>(secPagDirection-200))?1:0;

            var threePagDirection=GetScrollRealObject(this.window.scrollY,document.getElementById('secTriggerUp').getBoundingClientRect().y)+150;
            var refereceThreePag=(this.window.scrollY<threePagDirection && this.window.scrollY>(threePagDirection-200))?2:0;

            movSelectorDown=(referenceSecPag!=0)?referenceSecPag:movSelectorDown;
            movSelectorDown=(refereceThreePag!=0)?refereceThreePag:movSelectorDown;
            
            switch(movSelectorDown)
            {
                case(1):
                EfectElementHeader("resumenId");
                break;

                case(2):
                EfectElementHeader("skillsId");
                break;
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

        var idName=this.id;

        EfectElementHeader(idName);
        
        switch(idName)
        {
            case("inicioId"):
            location.reload();
            break;

            case("resumenId"):
            var oldScroll=this.window.scrollY;
            var maxSroll=0;
            LerpFuncion(oldScroll,maxSroll,this);
            EfectElementHeader("resumenId");
            break;

            case("skillsId"):
            var oldScroll=window.scrollY;
            var maxSroll=GetScrollRealObject(window.scrollY,document.getElementById('callSecPag').getBoundingClientRect().y);
            LerpFuncion(oldScroll,maxSroll,window);
            break;

            case("proyectoId"):
            var oldScroll=window.scrollY;
            var maxSroll=GetScrollRealObject(window.scrollY,document.getElementById('threePagConteiner').getBoundingClientRect().y);
            LerpFuncion(oldScroll,maxSroll,window);

            break;

            case("contactoId"):
            break;
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
	return ((max - min) * value)+ min;
}

function GetScrollRealObject(positionRealScroll,objetRelativeScroll)
{
    return (positionRealScroll+objetRelativeScroll);
}

function EfectElementHeader(idElementSelect)
{
    for(x=0; x<liSelector.length;x++)
        {
            
            if(liSelector[x].id==idElementSelect && (!liSelector[x].querySelector('.hidden') || !liSelector[x].querySelector('.textLetterColorDisable')))
                {
                    const newImageDisable= liSelector[x].querySelector('.activeImageSelector');
                    newImageDisable.classList.add('hidden');
        
                    const newImgTextDisable= liSelector[x].querySelector('.textLetterColor');
                    newImgTextDisable.classList.add('textLetterColorDisable');
                    continue;

                } else if(liSelector[x].id!=idElementSelect && (liSelector[x].querySelector('.hidden') || liSelector[x].querySelector('.textLetterColorDisable')))
                    {
                        const imgDisable= liSelector[x].querySelector('.hidden');
                        imgDisable.classList.remove('hidden');
            
                        const imgTextDisable=liSelector[x].querySelector('.textLetterColorDisable');
                        imgTextDisable.classList.remove('textLetterColorDisable');
                        continue;
                    }
                        

        }
}
