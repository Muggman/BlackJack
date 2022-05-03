/* 
2C=Two of Clubs
2D=Two of Diamonds
2H=Two of Hearts
2S=Two of Spades
*/
let deck = [];
const tipos =['C','D','H','S']
const especiales = ['A','J','Q','K'];
let puntosJugador=0;
let  puntosComputadora=0;

//Referencias del HTML
const btnPedir=document.querySelector('#btnPedir');
const btnDetener=document.querySelector('#btnDetener');
const btnNuevo=document.querySelector('#btnNuevo');
const divCartaJ=document.querySelector('#jugador-cartas');
const divCartaC=document.querySelector('#computadora-cartas');

const smalls = document.querySelectorAll('small')

const crearDeck =()=>{
    for (let i=2;i<=10;i++){
        for(let tipo of tipos){
           deck.push(i+tipo)
        }
    }
   for(let tipo of tipos){
       for(let esp of especiales){
           deck.push(esp+tipo)
       }
   }
  
     deck = _.shuffle(deck);
     return (deck);
     
}

crearDeck();


const pedirCarta = ()=>{
  if (deck.length === 0 ){ 
      throw 'No hay mas cartas en el deck';
  }
    const carta = deck.pop();

    return carta;
}
//pedirCarta();
const valorCarta = (carta)=>{
 const valor = carta.substring(0,carta.length-1);
 return (isNaN(valor))?
     (valor==='A')?11:10
     :valor*1;
}
//turno de la computadora
const turnoComputadora = (puntosMinimos)=>{
    do{
        const carta = pedirCarta();
        puntosComputadora=puntosComputadora+valorCarta(carta);
    
        smalls[1].innerText=puntosComputadora;
        //<img class="carta" src="assets/cartas/10C.png">
        const imgCarta=document.createElement('img')
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartaC.append(imgCarta);
    
        if(puntosMinimos>21){
            break;
        }
   1 }while((puntosComputadora < puntosMinimos)&&(puntosMinimos<=21));
 setTimeout(() => {
     
 
   if(puntosComputadora===puntosMinimos){
      alert('Nadie gana :C');
  }else if(puntosMinimos>21){
      alert('La casa gana');
  }else if(puntosComputadora>21){
      alert('Jugador gana');
  }else{
      alert('Computadora gana');
  }

}, 40); 
}

//Eventos
btnPedir.addEventListener('click',()=>{
    const carta = pedirCarta();
    puntosJugador=puntosJugador+valorCarta(carta);

    smalls[0].innerText=puntosJugador;
    //<img class="carta" src="assets/cartas/10C.png">
    const imgCarta=document.createElement('img')
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    
    divCartaJ.append(imgCarta);
    if (puntosJugador>21){
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        console.warn('Lo siento mucho,perdiste');
        turnoComputadora(puntosJugador);
    }else if(puntosJugador===21){
        console.warn('21,Genial');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }    

});

btnDetener.addEventListener('click',()=>{
    btnPedir.disabled=true;
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador);
});
btnNuevo.addEventListener('click',()=>{
    console.clear();
    deck=[];
    deck=crearDeck();
    puntosJugador=0;
    puntosComputadora=0;
    smalls[0].innerHTML=0;
    smalls[1].innerHTML=0;
    divCartaC.innerHTML='';
    divCartaJ.innerHTML='';
    btnPedir.disabled=false;
    btnDetener.disabled=false;


});

