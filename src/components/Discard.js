import React from 'react'
import { connect } from 'react-redux'


class Discard extends React.Component {


  onDragStart = (ev, card) => {
    ev.dataTransfer.setData("card", JSON.stringify(card))
    this.props.updateDraggedCard(card)
  }

  onDragOver = (ev, card) => {
    ev.preventDefault();
  }

  renderDiscard = ()=>{
    let row = []



  for(let card of this.props.discard){

        let divStyle = {
               position: "absolute",
               width: "100px",
               height: "135px",
               top: "50px",
               left: "200px"
        }


        row.push(<img key={card.image_url} src={card.hidden ? process.env.PUBLIC_URL + '/backofcard.png'  : process.env.PUBLIC_URL + `${card.image_url}`} onDragStart={(e)=> this.onDragStart(e, card)} draggable={card.hidden ? false : true} style={divStyle}  onClick={(e)=>this.onClick(e, card)} />)
  }

    return row
  }







  render() {
    return (
          <div>
          {this.renderDiscard()}
           </div>
    );
  }

}



export default Discard
