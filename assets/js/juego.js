/**
 * c4 -> four of clubs
 * d4 -> four of diamonds
 * h4 -> four of hearts
 * s4 -> four of swords
 */

let deck = []; //mazo de cartas
const tipos = ['c','d','h','s'];//Tipos de cartas
let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias de html

const btnPedir = document.querySelector( '#btnPedir' );
const btnDetener = document.querySelector( '#btnDetener' );
const btnNuevo = document.querySelector( '#btnNuevo' );

const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');



//funcion que crea el mazo
const crearDeck = () => {

    // Se llena el arreglo deck (mazo de cartas)
    for( let i = 1 ; i <= 13 ; i++ ){
        for (let tipo of tipos) {
            deck.push(tipo + i);    
        }

    }

    
    deck = _.shuffle(deck);

    return deck;
}

crearDeck();

// Funcion que permite tomar una carta
const pedirCarta = () => ((deck.length===0) ? 'lo siento ya no hay cartas' : deck.pop());


//Se extrae el ultimo valor de la cadena, ejemplo: 'd12' -> '12' -> 12
const trasnformarValor = ( carta ) => carta.substring(1,carta.length)*1;


// Funcion que sirve para obtener el valor de una carta
const valorCarta = ( carta ) => (trasnformarValor(carta) === 1 ) ? 11 : (trasnformarValor(carta) < 10) ? trasnformarValor(carta) : 10;

const turnoComputadora = ( puntosMinimos ) => {

    do{

        const carta = pedirCarta(); // se pide como tal una carta
        puntosComputadora += valorCarta( carta );//se obtiene los puntos de la carta y se van sumando en esta variable
        puntosHTML[1].innerHTML = puntosComputadora; //Se modifica el html en la parte donde dice  <small>aquie va el numero que cambia</small>
        divCartasComputadora.append( cartaNueva(carta) );//Se agrega una nueva carta

        if( puntosMinimos > 21) break;
    
    }while( ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ));

    // setTimeout sirve para ejecutar la instruccion que lleva dentro de la funcion anonima depues de un tiempo en milisegundos, este caso es 10 ms.
    // Ahora bien, se usa setTimeout en esta caso por que en javascript todo es por hilos y se procesa de manera simultaneo, y con esta instruccion lo que se hace es esperar a que termine el hilo del ciclo do-while 
    setTimeout(() => alert( ( (puntosComputadora === puntosMinimos) ? 'Nadie gana' : (puntosMinimos > 21) ? 'Computadora gana' : (puntosComputadora > 21) ? 'Jugador gana' : 'Computadora gana') ), 30);

}

const cartaNueva = ( carta ) => {

    const imgCarta = document.createElement('img');// se crea el elemneto de tipo imagen y se agrega al HTML
    imgCarta.src = `assets/Cartas/${ carta }.png`;// se le da como atributo la imagen en cuestio, la cual depende de la carta que se pidio
    imgCarta.classList.add('carta');// se le da la clase de estilo de bootstrap la cual nombramos como carta
    return imgCarta; // se regresa el objeto como tal

}

// EVENTOS

// Boton pedir carta: al hacer click agrega cartas al jugador y dependiendo de la suma total de puntos, se deshabilitan los botones de pedir cartas y detener
btnPedir.addEventListener('click',()=>{

    // aqui va el callback 
    const carta = pedirCarta(); // se pide como tal una carta
    puntosJugador += valorCarta( carta );//se obtiene los puntos de la carta y se van sumando en esta variable
    puntosHTML[0].innerHTML = puntosJugador; //Se modifica el html en la parte donde dice  <small>aquie va el numero que cambia</small>
    divCartasJugador.append( cartaNueva(carta) );//Se agrega una nueva carta

    if( puntosJugador > 21 ){//si el jugador obtiene mas de 21 puntos, pierde y se deshabilita el boton de pedir carta

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        console.warn( 'Lo siento, perdiste mi crack' );
        turnoComputadora( puntosJugador );

    }else if ( puntosJugador === 21 ){//si el jugador obtiene 21 puntos, gana por lo que se deshabilita el boton de pedir carta

        btnPedir.disabled = true;
        console.warn('21, ahuevo crack');
        turnoComputadora( puntosJugador );
    }

});

// Boton detener: este funciona para pasar el turno a la computadora, cuando ya no se quiere pedir cartas 
btnDetener.addEventListener('click',()=>{

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );//Se pasa el turno a la computadora

});

// Boton Nuevo Juego: reinicia el programa practicamente, realiza un nuevo deck y vacia el espacio del jugador y de la computadora, ademas, se inicializa en 0 los puntajes
btnNuevo.addEventListener('click', () => {
    
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosComputadora = 0;
    puntosJugador = 0;

    puntosHTML[0].innerText = puntosJugador;
    puntosHTML[1].innerText = puntosComputadora;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});
