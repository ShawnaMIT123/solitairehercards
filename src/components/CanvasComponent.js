import React from 'react'
import { connect } from 'react-redux'

class CanvasComponent extends React.Component {
    componentDidMount() {
        this.draw();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
    }

    draw = () => {
        var ctx = this.refs.canvas.getContext('2d');
        var img = new Image();
          img.onload = function() {
            for (var i = 0; i < 2; i++) {
                ctx.drawImage(img, 100, i * 20, 100, 135);
            }
          };
          img.src = process.env.PUBLIC_URL + '/hearts/7.png' ;
    }
    test = ()=> {
      return(
        <div styles="position:relative">
         <canvas id="canvas1" src={process.env.PUBLIC_URL + '/hearts/7.png'} width="500" height="500" style={{zIndex:1, position: "absolute", top: 0, left: 0}} />
         <canvas id="canvas2" src={process.env.PUBLIC_URL + '/hearts/7.png'} width="500" height="500" style={{zIndex:0, position: "absolute", top: 0, left: 0}} />
        </div >
       )
    }
    render() {
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}
export default CanvasComponent
