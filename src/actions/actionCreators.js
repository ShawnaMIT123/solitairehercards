
import {
  UPDATE_DRAGGED_CARD,
  REMOVE_CARD_FROM_TABLEAU_COL,
  ADD_CARD_TO_TABLEAU_COL,
  ADD_CARD_TO_FOUNDATION,
  REVEAL_CARD_IN_TABLEAU,
  REMOVE_CARD_FROM_STOCK_PILE,
  ADD_CARD_TO_DISCARD,
  TRANSFER_DISCARD_TO_STOCK_PILE,
  REMOVE_DISCARD,
  REMOVE_CARD_FROM_DISCARD,
  REMOVE_CARD_FROM_FOUNDATION
} from './types'

export function updateDraggedCard(card){
        return ({type: UPDATE_DRAGGED_CARD, payload: {draggedCard: card}})
}

export function removeCardfromTableauColumn(card, num){
        return ({type: REMOVE_CARD_FROM_TABLEAU_COL, payload: { removedCard: card, index: num }})
}
export function removeCardfromStockPile(){
        return ({type: REMOVE_CARD_FROM_STOCK_PILE})
}
export function transferDiscardToStockPile(){
        return ({type: TRANSFER_DISCARD_TO_STOCK_PILE})
}
export function removeDiscard(){
        return ({type: REMOVE_DISCARD})
}
export function removeCardFromDiscard(){
        return ({type: REMOVE_CARD_FROM_DISCARD})
}

export function addCardToTableauColumn(card, key){
        return ({type: ADD_CARD_TO_TABLEAU_COL, payload: { transferredCard: card, newColumn: key}})
}
export function revealCardInTableau(card, key){
        return ({type: REVEAL_CARD_IN_TABLEAU, payload: { transferredCard: card, newColumn: key}})
}
export function addCardToFoundation(card, key){
        return ({type: ADD_CARD_TO_FOUNDATION, payload: { transferredCard: card, newColumn: key}})
}
export function addCardToDiscard(card){
        return ({type: ADD_CARD_TO_DISCARD, payload: { transferredCard: card}})
}
export function removeCardFromFoundation(num){
        return ({type: REMOVE_CARD_FROM_FOUNDATION, payload: { index: num }})
}
