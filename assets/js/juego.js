/**
 * c4 -> four of clubs
 * d4 -> four of diamonds
 * h4 -> four of hearts
 * s4 -> four of swords
 */

//  Funcion anonima autoinvocada, consciste en que la funcion anonima se va auto llamar en tiempo de ejecucion
// Esta funcion sirve para realizar el patron de diseño modulo
const modulo = (() => {

    'use strict'; // instruccion que indica al interprete de JS que sea 'estricto' al momento de ejecutar, mostrara mas errores en pocas palabras  
    

     let deck = []; //mazo de cartas
     const tipos = ['c', 'd', 'h', 's'];//Tipos de cartas

    //                      
     let puntosJugadores = []; // la ultima posicion del arreglo se le asigna a la computadora, las primeras posiciones son para los jugadores

     // Referencias de html

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');


    // funcion que inicializa el juego
     const inicializarJuego = ( numJugadores = 2 ) => {

        deck = crearDeck();

        puntosJugadores = []; // Se reinicializa todos los jugadores, por lo que se vacia el  deck

        for( let i = 0 ; i < numJugadores ; i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0 );// se inicializa en el html en 0 en cada jugador y computadora

        divCartasJugadores.forEach(elem => elem.innerText = '' );//

        btnPedir.disabled = false;
        btnDetener.disabled = false;

     }

     //funcion que crea el mazo
     const crearDeck = () => {

        deck = [];

         // Se llena el arreglo deck (mazo de cartas)
         for (let i = 1; i <= 13; i++) {
             for (let tipo of tipos) {
                 deck.push(tipo + i);
             }
         }

         return _.shuffle(deck);
     }
     

     // Funcion que permite tomar una carta
     const pedirCarta = () => ((deck.length === 0) ? 'lo siento ya no hay cartas' : deck.pop());


     //Se extrae el ultimo valor de la cadena, ejemplo: 'd12' -> '12' -> 12
     const trasnformarValor = (carta) => carta.substring(1, carta.length) * 1;


     // Funcion que sirve para obtener el valor de una carta
     const valorCarta = (carta) => (trasnformarValor(carta) === 1) ? 11 : (trasnformarValor(carta) < 10) ? trasnformarValor(carta) : 10;

    //  Turno: 0 => primer juagdor y el ultimo => compu
     const acumularPuntos = ( carta , turno ) => {

        puntosJugadores[turno] += valorCarta(carta);//se obtiene los puntos de la carta y se van sumando en esta variable
        puntosHTML[turno].innerHTML = puntosJugadores[turno]; //Se modifica el html en la parte donde dice  <small>aquie va el numero que cambia</small>

        return puntosJugadores[turno];

     }

    const cartaNueva = (carta, turno) => {

        const imgCarta = document.createElement('img');// se crea el elemneto de tipo imagen y se agrega al HTML
        imgCarta.src = `assets/Cartas/${carta}.png`;// se le da como atributo la imagen en cuestio, la cual depende de la carta que se pidio
        imgCarta.classList.add('carta');// se le da la clase de estilo de bootstrap la cual nombramos como carta
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {
        
        const [ puntosMinimos , puntosComputadora ] = puntosJugadores;

        // setTimeout sirve para ejecutar la instruccion que lleva dentro de la funcion anonima depues de un tiempo en milisegundos, este caso es 10 ms.
        // Ahora bien, se usa setTimeout en esta caso por que en javascript todo es por hilos y se procesa de manera simultaneo, y con esta instruccion lo que se hace es esperar a que termine el hilo del ciclo do-while 
        setTimeout(() => alert(((puntosComputadora === puntosMinimos) ? 'Nadie gana' : (puntosMinimos > 21) ? 'Computadora gana' : (puntosComputadora > 21) ? 'Jugador gana' : 'Computadora gana')), 30);
    }

     const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

         do {

            const carta = pedirCarta(); // se pide como tal una carta
            puntosComputadora = acumularPuntos( carta , puntosJugadores.length-1 );
            cartaNueva(carta , puntosJugadores.length-1);

            if (puntosMinimos > 21) break;

         } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

         determinarGanador();

     }

     // EVENTOS

     // Boton pedir carta: al hacer click agrega cartas al jugador y dependiendo de la suma total de puntos, se deshabilitan los botones de pedir cartas y detener
     btnPedir.addEventListener('click', () => {

         // aqui va el callback 
         const carta = pedirCarta(); // se pide como tal una carta
         const puntosJugador = acumularPuntos(carta, 0);

         cartaNueva( carta, 0 );//Se agrega una nueva carta

         if (puntosJugador > 21) {//si el jugador obtiene mas de 21 puntos, pierde y se deshabilita el boton de pedir carta

             btnPedir.disabled = true;
             btnDetener.disabled = true;
             console.warn('Lo siento, perdiste mi crack');
             turnoComputadora(puntosJugador);

         } else if (puntosJugador === 21) {//si el jugador obtiene 21 puntos, gana por lo que se deshabilita el boton de pedir carta

             btnPedir.disabled = true;
             btnDetener.disabled = true;
             console.warn('21, muy bien mi crack');
             turnoComputadora(puntosJugador);
         }

     });

     // Boton detener: este funciona para pasar el turno a la computadora, cuando ya no se quiere pedir cartas 
     btnDetener.addEventListener('click', () => {

         btnPedir.disabled = true;
         btnDetener.disabled = true;

         turnoComputadora(puntosJugadores[0]);//Se pasa el turno a la computadora

     });

    //  la funcion retorna un objeto el cual todos sus atributos, son las referencias  los cuales seran publicos, por lo tanto visible
     return {

        nuevoJuego: inicializarJuego

     };

 })();

//  NOTA: el modo estricto es recomendable usar cuando se implementa el patron de deseño modulo



