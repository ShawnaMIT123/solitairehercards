import {
  UPDATE_DRAGGED_CARD,
  REMOVE_CARD_FROM_TABLEAU_COL,
  ADD_CARD_TO_TABLEAU_COL,
  ADD_CARD_TO_FOUNDATION,
  REVEAL_CARD_IN_TABLEAU,
  REMOVE_CARD_FROM_STOCK_PILE,
  ADD_CARD_TO_DISCARD,
  REMOVE_DISCARD,
  TRANSFER_DISCARD_TO_STOCK_PILE,
  REMOVE_CARD_FROM_DISCARD,
  REMOVE_CARD_FROM_FOUNDATION
} from './actions/types'

class Deck{
  constructor(){
    this.deck = [];
    this.reset();
    this.shuffle();
  }

  reset(){
    this.deck = [];
    const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    for (let suit in suits) {
      for (let value of values) {
        this.deck.push({suit: `${suits[suit]}`, value, image_url: `/${suits[suit]}/${value}.png`, hidden: true});
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
}
const deck = new Deck();
const cardsintableau = deck.deck.slice(24)
const cardsinpile = deck.deck.slice(0,24)

function cardstotableu() {
      let i = 1
      let obj = {}

     let arr = []
      for(let card of cardsintableau){
        if(Object.keys(obj).length == 0){
          card["hidden"] = false
          obj[i] = [card]
          i++
        } else if (!obj[i]) {
          obj[i] = [card]
        } else if (obj[i].length < i ) {
          if(obj[i].length == i - 1){
            card["hidden"] = false
            obj[i] = obj[i].concat([card])
            i++
          } else {

            obj[i] = obj[i].concat([card])

          }
        }
      }
      return obj
}


const defaultState =  {
deck: deck,
tableau: cardstotableu(),
stockpile:cardsinpile,
draggedCard: null,
foundation: {1:[],2:[],3:[],4:[]},
discard: []
}


function reducer(state=defaultState, action){
  console.log(action)
  switch (action.type) {
      case (UPDATE_DRAGGED_CARD):
                    return Object.assign({}, state, {draggedCard: action.payload.draggedCard})
      case (REMOVE_CARD_FROM_TABLEAU_COL):
      return {
        ...state,
        tableau: {
          ...state.tableau,
          [parseInt(action.payload.removedCard.colkey)]: state.tableau[action.payload.removedCard.colkey].slice(0, -action.payload.index)
        }
      }
      case (REMOVE_CARD_FROM_FOUNDATION):
      return {
        ...state,
        foundation: {
          ...state.foundation,
          [parseInt(action.payload.index)]: state.foundation[parseInt(action.payload.index)].slice(0, -1)
        }
      }
      case (REMOVE_CARD_FROM_STOCK_PILE):
      let newState = [...state.stockpile]
      newState.splice(-1,1)
      return {
        ...state,
        stockpile: newState
      }
      case (REMOVE_CARD_FROM_DISCARD):
      let newDiscardState = [...state.discard]
      newDiscardState.splice(-1,1)
      return {
        ...state,
        discard: newDiscardState
      }
      case (ADD_CARD_TO_TABLEAU_COL):
      let currentTabColState = [...state.tableau[action.payload.newColumn].slice(0), action.payload.transferredCard ]

      return {
        ...state,
        tableau: {
          ...state.tableau,
          [parseInt(action.payload.newColumn)]:   currentTabColState.flat()
        }
      }
      case (REVEAL_CARD_IN_TABLEAU):
      return {
        ...state,
        tableau: {
          ...state.tableau,
          [parseInt(action.payload.newColumn)]: state.tableau[action.payload.newColumn].map((card, index)=>{
            if(card.image_url === action.payload.transferredCard.image_url) {
              return Object.assign({}, card, {
                hidden: false
              })
            }
            return card
          })
        }
      }
      case (ADD_CARD_TO_FOUNDATION):
      return {
        ...state,
        foundation: {
          ...state.foundation,
          [parseInt(action.payload.newColumn)]: [...state.foundation[action.payload.newColumn].slice(0), action.payload.transferredCard ]
        }
      }

      case (ADD_CARD_TO_DISCARD):
                  return {...state, discard: [...state.discard, action.payload.transferredCard]}
      case (TRANSFER_DISCARD_TO_STOCK_PILE):
      let newStockState = [...state.discard].reverse()
      let newStockPile = newStockState.map((card)=>{
        card["hidden"] = true
        return card
      })
          return {...state, stockpile: newStockPile}

      case (REMOVE_DISCARD):
                  return {...state, discard: []}
    default:
      return state
  }
}

export default reducer
