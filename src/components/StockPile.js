import React from 'react'
import { connect } from 'react-redux'


class StockPile extends React.Component {

  onClick = (ev, card) => {
    console.log(card)
    this.props.removeCardfromStockPile()
    card["hidden"] = false
    this.props.addCardToDiscard(card)
  }

  recyleDiscard = () => {
    console.log("recyleDiscard")
    this.props.transferDiscardToStockPile()
    this.props.removeDiscard()
  }
  renderStockPile = ()=>{
    let row = []
    let top = 50



  for(let card of this.props.stockpile){

        let divStyle = {
               position: "absolute",
               width: "100px",
               height: "135px",
               left: "50px"
        }

        divStyle["top"] = top
                top += .3




        row.push(<img key={card.image_url} src={card.hidden ? process.env.PUBLIC_URL + '/backofcard.png'  : process.env.PUBLIC_URL + `${card.image_url}`} onDragOver={(e)=>this.onDragOver(e, card)} onDragStart={(e)=> this.onDragStart(e, card)} draggable={card.hidden ? false : true} style={divStyle}  onClick={(e)=>this.onClick(e, card)} />)
  }

    return row
  }

  renderRecyle = ()=>{

          let divStyle = {
                 position: "absolute",
                 width: "100px",
                 height: "135px",
                 top: "50px",
                 left: "50px"
          }
          return <p className="rectangle" key={"recycle"}  style={divStyle} onClick={(e)=>this.recyleDiscard()}/>

  }





render() {
  let stockpile = this.renderStockPile()
    let recycle = this.renderRecyle()

  return (
        <div>
        {recycle}
        {stockpile}
         </div>
  );
}

}



export default StockPile
