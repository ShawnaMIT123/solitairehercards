import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'
import logo from '../logo.svg';

import Draggable from 'react-draggable';

class Tableau extends React.Component {
// <Draggable><Image src={process.env.PUBLIC_URL + '/hearts/zoraheart7.png'}  style={divStyle} size='small' className="diamond" /> </ Draggable>

columns = ()=>{

      // return _.times(7, i => (
      //   <Grid.Column stackable key={i}>
          // <Image src={process.env.PUBLIC_URL + '/hearts/zoraheart7.png'}  size='huge' className="diamond" />
      //     <Image src={process.env.PUBLIC_URL + '/hearts/zoraheart7.png'} className="club" />
      //
      //   </Grid.Column>
      // ))
      return   <Image src={process.env.PUBLIC_URL + '/hearts/zoraheart7.png'}  size='small' className="diamond" />
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

      row.push(<img key={card.image_url} src={process.env.PUBLIC_URL + '/hearts/test/zoraheart7.png'} draggable="true" style={divStyle} />)
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
