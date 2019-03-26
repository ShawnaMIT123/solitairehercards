import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
// import { Grid, Image } from 'semantic-ui-react'
import logo from '../logo.svg';

import Draggable from 'react-draggable';


class Tableau extends React.Component {

  // componentDidMount() {
  //     this.draw();
  // }
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

onDragStart = (ev, card, key) => {
  console.log("dragStart");
  card["colkey"] = key
  ev.dataTransfer.setData("card", JSON.stringify(card))


// var imgArray = ['process.env.PUBLIC_URL/backofcard.png','process.env.PUBLIC_URL/backofcard.png'];
//   // let dragImage = document.createElement("canvas")
    // let canvas = this.refs.canvas
    //  var context = canvas.getContext('2d');
    //  let node = this.myRef.current;
    //  canvas.setAttribute("width", "100px");
    //  canvas.setAttribute("height", "400px");
    //  node.setAttribute("position", "absolute");
    // node.setAttribute("top", "600px")
     // canvas.setAttribute("left", )

    // canvas.width  = '800px';
  // var context = dragImage.getContext("2d");
  // context.canvas.width  = '100px';
  // context.canvas.height = '135px';





  // for(let i = 0; i < 2; i++){
  //
  //   var imageObj = new Image();
  //   imageObj.src = imgArray[i];
  //   imageObj.onload = function() {
  //   context.drawImage(imageObj, 100, i * 20, 100, 135);
  //   };
  // }




  // ev.dataTransfer.setDragImage(canvas, 0, 0);
  // let ctx = dragImage.getContext('2d');
  // ctx.canvas.width  = window.innerWidth;
  // ctx.canvas.height = window.innerHeight;
  // let img = new Image();
  //   img.onload = function() {
  //     for (var i = 0; i < 2; i++) {
  //         ctx.drawImage(img, 100, i * 20, 100, 135);
  //     }
  //   };
  //   img.src = "https://mdn.mozillademos.org/files/5397/rhino.jpg" ;
  //
  //   ev.dataTransfer.setDragImage("https://mdn.mozillademos.org/files/5397/rhino.jpg", 10, 10);
  //
  //   debugger;
  //
  //
  //
  // card["colkey"] = key
  //
  // ev.dataTransfer.setData("card", JSON.stringify(card))
  // // ev.dataTransfer.setData("colkey", JSON.stringify(key))
  this.props.updateDraggedCard(card)
  //
  //
  //  ////store id for when dropped
   // console.log("dragStart");
// // Set the drag's format and data. Use the event target's id for the data
//   card["colkey"] = key
//   ev.dataTransfer.setData("card", JSON.stringify(card))
// ev.dataTransfer.setData("text/plain", ev.target.id);
// Create an image and use it for the drag image
// NOTE: change "example.gif" to an existing image or the image will not
// be created and the default drag image will be used.


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


           let cardUnderneath = card

             let suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
             let cardUnderneathIndex = suits.findIndex(suit => suit === cardUnderneath.suit) + 1
             let draggedCardIndex = suits.findIndex(suit => suit === draggedCard.suit) + 1
             console.log("draggedCard", draggedCard)


console.log("card", this.props.discard.map((card)=>card.image_url))
console.log("cardUnderneath", card)
console.log("includes", this.props.discard.map((card)=>card.image_url).includes(draggedCard.image_url))

           for(let key in this.props.tableau){
             let arr = this.props.tableau[key]
             ////if card is the last card in column
               if(arr[arr.length - 1].image_url == cardUnderneath.image_url){


                 if(draggedCard.value == cardUnderneath.value - 1  && cardUnderneathIndex%2 !== draggedCardIndex%2){

                      // debugger;
                   // this.props.removeCardfromTableauColumn(draggedCard)



                   if(this.props.discard.map((card)=>card.image_url).includes(draggedCard.image_url)){
                     this.props.addCardToTableauColumn(draggedCard, key)
                     this.props.removeCardFromDiscard()
                   } else{
                     let arr2 = this.props.tableau[parseInt(draggedCard.colkey)]
                     let draggedCardNumIndex = arr2.findIndex(card => card.image_url === draggedCard.image_url)
                        let draggedCards = arr2.slice(draggedCardNumIndex)
                        let num = arr2.length - draggedCardNumIndex
                        this.props.addCardToTableauColumn(draggedCards, key)
                     this.props.removeCardfromTableauColumn(draggedCard, num)
                   }
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
// SetImage() {
//   img = new Image();
//   img.crossOrigin = "Anonymous";
//   img.src = process.env.PUBLIC_URL + '/hearts/7.png';
//   canvas = this.canvas1;
//   canvas2 = this.canvas2;
//   ctx = canvas.getContext('2d');
//   ctx2 = canvas2.getContext('2d');
//   img.onload = function() {
//     ctx.drawImage(img, 0, 0);
//     img.style.display = 'none';
//   };
//   color = this.color1;
//   coordinates = this.coordinates1;
//
//   function pick(event) {
//     var x = event.layerX;
//     var y = event.layerY;
//     var pixel = ctx.getImageData(x, y, 1, 1);
//     var data = pixel.data;
//     var rgba = 'rgba(' + data[0] + ', ' + data[1] +
//                ', ' + data[2] + ', ' + (data[3] / 255) + ')';
//     var coord = '(x: ' +  x  + ', y: ' + y + ')';
//     //color.style.background =  rgba;
//     color.textContent = rgba;
//     coordinates.textContent = coord;
//
//     ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
//     ctx2.fillStyle = 'red';
//     ctx2.fillRect(x, y, rectSize.dim.w, rectSize.dim.h);
//   }
//   canvas.addEventListener('mousemove', pick);
//  }
//
// test = ()=> {
//   return(
//     <div styles="position:relative">
//      <canvas id="canvas1" src={process.env.PUBLIC_URL + '/hearts/7.png'} ref={(ref) => this.canvas1 = ref} width="500" height="500" style={{zIndex:1, position: "absolute", top: 0, left: 0}} />
//      <canvas id="canvas2" src={process.env.PUBLIC_URL + '/hearts/7.png'} ref={(ref) => this.canvas1 = ref} width="500" height="500" style={{zIndex:0, position: "absolute", top: 0, left: 0}} />
//     </div >
//    )
// }
//
// test2 = () => {
//   var myImages = [logo, logo]
//   var imageCount = myImages.length;
//   var loadedCount = 0, errorCount = 0;
//
//   var checkAllLoaded = function() {
//     if (loadedCount + errorCount == imageCount ) {
//        // do what you need to do.
//     }
//   };
//
//   var onload = function() {
//     loadedCount++;
//     checkAllLoaded();
//   }, onerror = function() {
//     errorCount++;
//     checkAllLoaded();
//   };
//
//   for (var i = 0; i < imageCount; i++) {
//     var img = new Image();
//     img.onload = onload;
//     img.onerror = onerror;
//     img.src = myImages[i];
//   }
//
// }

// draw = () => {
//     var ctx = this.refs.canvas.getContext('2d');
//     var img = new Image();
//       img.onload = function() {
//         for (var i = 0; i < 2; i++) {
//             ctx.drawImage(img, 100, i * 20, 100, 135);
//         }
//       };
//       img.src = process.env.PUBLIC_URL + '/hearts/7.png' ;
// }

rendercanvas = () => {
  return <div ref={this.myRef} ><canvas ref="canvas" width={window.innerWidth} height={window.innerHeight} /></div>
}

onLayoutDrop = (ev, stack) => {
  let draggedCard = JSON.parse(ev.dataTransfer.getData("card"));
  let stackindex = parseInt(stack) + 1
  if(draggedCard.value == 13){ //if king

    if(this.props.discard.map((card)=>card.image_url).includes(draggedCard.image_url)){
      this.props.addCardToTableauColumn(draggedCard, stackindex)
      this.props.removeCardFromDiscard()
    } else{
      let arr2 = this.props.tableau[parseInt(draggedCard.colkey)]
      let draggedCardNumIndex = arr2.findIndex(card => card.image_url === draggedCard.image_url)
         let draggedCards = arr2.slice(draggedCardNumIndex)
         let num = arr2.length - draggedCardNumIndex
         this.props.addCardToTableauColumn(draggedCards, stackindex)
      this.props.removeCardfromTableauColumn(draggedCard, num)
    }


  }

}

renderTableauLayout = ()=>{
  let row = []
  let  left = 120
//orginally 600


      for (let i = 0; i < 7; i++) {
        let divStyle = {
               position: "absolute",
               width: "100px",
               height: "135px",
               top: "220px"
        }

        divStyle["left"] = left
        left += 120

        row.push(<p className="rectangle" key={i}  onDragOver={(e)=>this.onDragOver(e, logo)} onDragStart={(e)=> this.onDragStart(e, logo)}  onDrop={(e)=>this.onLayoutDrop(e, `${i} stack`)} style={divStyle}  />)

      }

      return row

}

  render() {
      let elems = this.columns2()
      // let test3 = this.test
      // let canvas123 = this.rendercanvas()
      let elems2 = this.renderTableauLayout()

  return (
        <div>
      {elems2}
        {elems}




         </div>
  );
}

}



export default Tableau
