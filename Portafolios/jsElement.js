const liSelector= document.querySelectorAll('.liHeader');
const buttonSelection= document.getElementById('buttonInitPag');


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
    setTimeout(enablePagResumen(arrayInitComponent), 8);
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



        }



    })
})


