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

onDragOver = (ev) => {
           ev.preventDefault();
}
onDrop = (ev, card, key) => {
          // card["colkey"] = key

           let draggedCard = JSON.parse(ev.dataTransfer.getData("card"));
           let cardUnderneath = card
           this.props.removeCardfromTableauColumn(draggedCard)
           this.props.addCardToTableauColumn(draggedCard, key)

           // let tasks = this.state.tasks.filter((task)=>{
           //       if (task.name == id) {
           //             task.category = cat;
           //       }
           //       return task
           // })
           //
           // this.setState({
           //       ... this.state,
           //       tasks
           // });

}

columns2= ()=>{
let row = []
let  left = 0
for(let key in this.props.tableau){

      let topposition = 0
      left += 200


for(let card of this.props.tableau[key]){
      // let topposition = 0

      let divStyle = {
             position: "absolute",
             width: "150px",
             height: "250 px"
      }
      topposition += 30
      divStyle["top"] = topposition
      divStyle["left"] = left

      row.push(<img key={card.image_url} onDragOver={(e)=>this.onDragOver(e)} onDragStart={(e)=> this.onDragStart(e, card, key)}src={process.env.PUBLIC_URL + `${card.image_url}`} draggable="true" style={divStyle} onDrop={(e)=>this.onDrop(e, card, key)}/>)
      }
}
      return row

}
 // draggable src={process.env.PUBLIC_URL + '/hearts/zoraheart7.png'}  style={divStyle}  className="diamond" key={card.image_url}
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
