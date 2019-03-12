import React from 'react'
import { connect } from 'react-redux'
// import './App.css';

import logo from '../logo.svg';


class Foundation extends React.Component {

 //  renderTrack = (roomid) => {
 //        let room = this.findRoom(roomid)
 //
 //    return room[0].tracks.map(track => {
 //          console.log("track", track)
 //      return <TableItem key={track.id} track={track} {...this.props}/>
 //    })
 //  }
 //
 //  findRoom = (roomid) => {
 //      return this.props.rooms.filter((room)=>(room.id == roomid))
 //
 // }
 onDragStart = (ev, card) => {

   // card["colkey"]

   ev.dataTransfer.setData("card", JSON.stringify(card))
   // ev.dataTransfer.setData("colkey", JSON.stringify(key))
   this.props.updateDraggedCard(card)


    ////store id for when dropped
 }

 onDragOver = (ev, card) => {

   console.log("hello")

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
            let cardUnderneath = card
            let suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
            let stackindex = null
            if(cardUnderneath.includes("stack")){
              stackindex = parseInt(cardUnderneath) + 1
            }
            let draggedCardIndex = suits.findIndex(suit => suit === draggedCard.suit) + 1
            let arr = this.props.foundation[stackindex]
            console.log("stackindex", stackindex)
            console.log("draggedCardValue", draggedCard.value)


            if(arr.length == 0){/// if stack empty
              if(draggedCard.value == 1){// if ace
                this.props.removeCardfromTableauColumn(draggedCard)
                this.props.addCardToFoundation(draggedCard, stackindex)
              }
            } else {
              let last_card = arr[arr.length - 1];
              let lastCardIndex = suits.findIndex(suit => suit === last_card.suit) + 1
              if(draggedCard.value == last_card.value + 1 && draggedCardIndex == lastCardIndex){
                this.props.removeCardfromTableauColumn(draggedCard)
                this.props.addCardToFoundation(draggedCard, stackindex)
              }
              // debugger


            }



            // this.props.removeCardfromTableauColumn(draggedCard)
            // this.props.addCardToFoundation(draggedCard, stackindex)

            // for(let key in this.props.tableau){
            //   let arr = this.props.tableau[key]
            //   ////if card is the last card in column
            //     if(arr[arr.length - 1].image_url == cardUnderneath.image_url){
            //
            //       if(draggedCard.value == cardUnderneath.value - 1  && Math.sign(cardUnderneathIndex) !== Math.sign(draggedCardIndex)){
            //         this.props.removeCardfromTableauColumn(draggedCard)
            //         this.props.addCardToFoundation(draggedCard, key)
            //       }
            //     }
            //  }



            // this.props.updateDraggedCard(card)
 }

 renderFoundation = ()=>{
 let row = []
 let left = 120
//orginally 600


       for (let i = 0; i < 4; i++) {
         let divStyle = {
                position: "absolute",
                width: "100px",
                height: "135px",
                top: "50px"
         }

         divStyle["left"] = left
         left += 120

         row.push(<p className="rectangle" key={i}  onDragOver={(e)=>this.onDragOver(e, logo)} onDragStart={(e)=> this.onDragStart(e, logo)} draggable="true" onDrop={(e)=>this.onDrop(e, `${i} stack`)} style={divStyle}  />)

       }

       return row

 }

 columns3= ()=>{
   let row = []

   let left = 0
  // oringally 650

 for(let key in this.props.foundation){
   console.log("key", key);

     left += 120

   console.log("left", left)


   for(let card of this.props.foundation[key]){
        console.log("card", card);
            console.log("arr", this.props.foundation[key]);
       // let topposition = 0

       let divStyle = {
              position: "absolute",
              width: "100px",
              height: "135px",
              top: "50px"
       }

       divStyle["left"] = left
       // console.log(left)


       row.push(<img key={card.image_url} src={card.hidden ? process.env.PUBLIC_URL + '/backofcard.png'  : process.env.PUBLIC_URL + `${card.image_url}`} onDragOver={(e)=>this.onDragOver(e, card)} onDragStart={(e)=> this.onDragStart(e, card, key)} draggable="true" style={divStyle} onDrop={(e)=>this.onDrop(e, card, key)} />)
       }
 }
       return row

 }



  render() {
  let elems = this.renderFoundation()
  let cards = this.columns3()
    return (
      <div>
      {cards}
     {elems}
       </div>  )
  }

}
// const mapStateToProps = (state) => {
//   return {
//     selectedPlaylist: state.selectedPlaylist
//   }
// }
//
// const mapDispatchToProps = {
//
// }


export default Foundation
