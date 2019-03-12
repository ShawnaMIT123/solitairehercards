import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'
import logo from '../logo.svg';

import Draggable from 'react-draggable';

class Tableau extends React.Component {


onDragStart = (ev, card, key) => {

  card["colkey"] = key

  ev.dataTransfer.setData("card", JSON.stringify(card))
  // ev.dataTransfer.setData("colkey", JSON.stringify(key))
  this.props.updateDraggedCard(card)


   ////store id for when dropped
}

onDragOver = (ev, card) => {

    // let draggedCard = JSON.parse(ev.dataTransfer.getData("card"));
    // let cardUnderneath = card

     // let draggedCard = JSON.parse(ev.dataTransfer.getData("card"));
    //  console.log(ev.dataTransfer.getData("card"))

    // for(let key in this.props.tableau){
    //   let arr = this.props.tableau[key]
    //   /if card is the last card in column
    //
    //   if(arr[arr.length - 1].image_url == card.image_url && card.image_url !== draggedCard.image_url){
    //     console.log("last card :", card)
    //     // console.log("draggedCard", draggedCard)
    //
    //
    //
    //   }
// }

  ev.preventDefault();

}

onDrop = (ev, card, key) => {




           let draggedCard = JSON.parse(ev.dataTransfer.getData("card"));
           debugger;
            console.log(draggedCard)
           let cardUnderneath = card
           console.log("onDrop", card)
             let suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
             let cardUnderneathIndex = suits.findIndex(suit => suit === cardUnderneath.suit) + 1
             let draggedCardIndex = suits.findIndex(suit => suit === draggedCard.suit) + 1
             debugger

           for(let key in this.props.tableau){
             let arr = this.props.tableau[key]
             ////if card is the last card in column
               if(arr[arr.length - 1].image_url == cardUnderneath.image_url){
                 debugger

                 if(draggedCard.value == cardUnderneath.value - 1  && cardUnderneathIndex%2 !== draggedCardIndex%2){
                   debugger
                   this.props.removeCardfromTableauColumn(draggedCard)
                   this.props.addCardToTableauColumn(draggedCard, key)
                 }
               }
            }



           // this.props.updateDraggedCard(card)
}
onDoubleClick = (ev, card, key) => {







          let arr = this.props.tableau[parseInt(key)]
          let last_card = arr[arr.length - 1];

          if(card.image_url == last_card.image_url){
            this.props.revealCardInTableau(card, key)
          }






}

columns2= ()=>{
let row = []
let  left = 0
//200 orginally
for(let key in this.props.tableau){

      let topposition = 200
      left += 120


for(let card of this.props.tableau[key]){
      // let topposition = 0

      let divStyle = {
             position: "absolute",
             width: "100px",
             height: "135px"
      }
      topposition += 20
      divStyle["top"] = topposition
      divStyle["left"] = left

      row.push(<img key={card.image_url} src={card.hidden ? process.env.PUBLIC_URL + '/backofcard.png'  : process.env.PUBLIC_URL + `${card.image_url}`} onDragOver={(e)=>this.onDragOver(e, card)} onDragStart={(e)=> this.onDragStart(e, card, key)} draggable={card.hidden ? false : true} style={divStyle} onDrop={(e)=>this.onDrop(e, card, key)} onDoubleClick={(e)=>this.onDoubleClick(e, card, key)} />)
      }
}
      return row

}
 // draggable src={process.env.PUBLIC_URL + '/hearts/zoraheart7.png'}  style={divStyle}  className="diamond" key={card.image_url}
// process.env.PUBLIC_URL/backofcard.png
render() {
      let elems = this.columns2()
  return (
        <div>
       {elems}
         </div>
  );
}

}



export default Tableau
