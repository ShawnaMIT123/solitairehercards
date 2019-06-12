import React, { Component } from 'react';
import './App.css';
import { updateDraggedCard, removeCardfromTableauColumn, addCardToTableauColumn, addCardToFoundation, revealCardInTableau,  removeCardfromStockPile, addCardToDiscard, transferDiscardToStockPile, removeDiscard, removeCardFromDiscard, removeCardFromFoundation, startTimer, incrementTimer } from './actions/actionCreators.js';
import { connect } from 'react-redux';
import Tableau from './components/Tableau.js'
import Discard from './components/Discard.js'
import Foundation from './components/Foundation.js'
import Timer from './components/Timer.js'
import StockPile from './components/StockPile.js'
import { bindActionCreators } from 'redux'


class App extends Component {

  beginTimer = () => {
    if(this.props.timer["started"] == false){
         this.props.startTimer();
         this.incrementTimerBySec();

    }
  }

  incrementTimerBySec = () => {
        console.log("incrementBySec")
        setInterval(()=>{this.props.incrementTimer()},1000);
  }

  render() {
    return (
      <div className="App" onMouseDown={()=> this.beginTimer()}>
      <Timer {...this.props}/>
      <StockPile {...this.props}/>
      <Foundation {...this.props} />
      <Tableau {...this.props} />
      <Discard {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ updateDraggedCard, removeCardfromTableauColumn, addCardToTableauColumn, addCardToFoundation, revealCardInTableau,  removeCardfromStockPile, addCardToDiscard, transferDiscardToStockPile, removeDiscard, removeCardFromDiscard, removeCardFromFoundation, startTimer, incrementTimer }, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
