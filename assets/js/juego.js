/**
 * c4 -> four of clubs
 * d4 -> four of diamonds
 * h4 -> four of hearts
 * s4 -> four of swords
 */

let deck = []; //mazo de cartas
const tipos = ['c','d','h','s'];//Tipos de cartas


//funcion que crea el mazo
const crearDeck = () => {

    // Se llena el arreglo deck (mazo de cartas)
    for( let i = 1 ; i <= 13 ; i++ ){
        for (let tipo of tipos) {
            deck.push(tipo + i);    
        }

    }

    //Arreglo ordenado
    console.log( deck );

    //Arreglo ordenado aleatoriamente, se usa el metodo shuflle de la clase underscore "_" que se importo en el index.html
    deck = _.shuffle(deck);
    console.log( deck );

    return deck;
}

crearDeck();

// Funcion que permite tomar una carta
const pedirCarta = () => ((deck.length===0) ? 'lo siento ya no hay cartas' : deck.pop());


//Se extrae el ultimo valor de la cadena, ejemplo: 'd12' -> '12' -> 12
const trasnformarValor = ( carta ) => carta.substring(1,carta.length)*1;


// Funcion que sirve para obtener el valor de una carta
const valorCarta = ( carta ) => (trasnformarValor(carta) === 1 ) ? 11 : (trasnformarValor(carta) < 10) ? trasnformarValor(carta) : 10;


console.log(valorCarta(pedirCarta()));


// let carta = pedirCarta();
// console.log( "Tu carta es: " + carta );

// console.log( deck )