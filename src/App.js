import React, { Component } from 'react';
import './App.css';
import { updateDraggedCard, removeCardfromTableauColumn, addCardToTableauColumn, addCardToFoundation, revealCardInTableau,  removeCardfromStockPile, addCardToDiscard, transferDiscardToStockPile, removeDiscard, removeCardFromDiscard, removeCardFromFoundation } from './actions/actionCreators.js';
import { connect } from 'react-redux';
import Tableau from './components/Tableau.js'
import Discard from './components/Discard.js'
import Foundation from './components/Foundation.js'
import StockPile from './components/StockPile.js'
import { bindActionCreators } from 'redux'


class App extends Component {


  render() {
    return (
      <div className="App">
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
        ...bindActionCreators({ updateDraggedCard, removeCardfromTableauColumn, addCardToTableauColumn, addCardToFoundation, revealCardInTableau,  removeCardfromStockPile, addCardToDiscard, transferDiscardToStockPile, removeDiscard, removeCardFromDiscard, removeCardFromFoundation}, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
