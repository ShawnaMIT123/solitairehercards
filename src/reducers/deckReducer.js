

class Deck{
  constructor(){
    this.deck = [];
    this.reset();
    this.shuffle();
  }

  reset(){
    this.deck = [];

    const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push({suit, value, image_url: `/${suit}/${value}.png`});
      }
    }
  }
  shuffle(){
    const { deck } = this;
    let m = deck.length, i;

    while(m){
      i = Math.floor(Math.random() * m--);

      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return this;
  }

  // deal(){
  //   return this.deck.pop();
  // }
}
const deck1 = new Deck();

export default (state = {deck1}, action) => {
 switch (action.type) {
  case 'SHUFFLE':
   return {
    result: action.payload
   }
  default:
   return state
      }
}
