import React from "react";
import { connect } from "react-redux";


class Tableau extends React.Component {
  onDragStart = (ev, card, key) => {
    console.log("dragStart");
    card["colkey"] = key;
    ev.dataTransfer.setData("card", JSON.stringify(card));
    this.props.updateDraggedCard(card);
  };

  onDragOver = (ev, card) => {
    ev.preventDefault();
  };

  onDrop = (ev, card, key) => {
    let draggedCard = JSON.parse(ev.dataTransfer.getData("card"));

    let cardUnderneath = card;

    let suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
    let cardUnderneathIndex =
      suits.findIndex(suit => suit === cardUnderneath.suit) + 1;
    let draggedCardIndex =
      suits.findIndex(suit => suit === draggedCard.suit) + 1;
    console.log("draggedCard", draggedCard);

    console.log("card", this.props.discard.map(card => card.image_url));
    console.log("cardUnderneath", card);
    console.log(
      "includes",
      this.props.discard
        .map(card => card.image_url)
        .includes(draggedCard.image_url)
    );
    let foundationCards = [];
    for (let arr in this.props.foundation) {
      foundationCards.push(this.props.foundation[arr]);
    }

    let foundationCardLength = 0;
    for (let arr of foundationCards) {
      foundationCardLength += arr.length;
    }

    let flatfoundationCards = foundationCards.flat();

    for (let key in this.props.tableau) {
      let arr = this.props.tableau[key];
      ////if card is the last card in column
      if (arr[arr.length - 1].image_url == cardUnderneath.image_url) {
        if (
          draggedCard.value == cardUnderneath.value - 1 &&
          cardUnderneathIndex % 2 !== draggedCardIndex % 2
        ) {
          // debugger;
          // this.props.removeCardfromTableauColumn(draggedCard)

          if (
            this.props.discard
              .map(card => card.image_url)
              .includes(draggedCard.image_url)
          ) {
            this.props.addCardToTableauColumn(draggedCard, key);
            this.props.removeCardFromDiscard();
          } else if (
            flatfoundationCards
              .map(foundCard => foundCard.image_url)
              .includes(draggedCard.image_url)
          ) {
            let num = null;
            for (let array in this.props.foundation) {
              if (
                this.props.foundation[array]
                  .map(card => card.image_url)
                  .includes(draggedCard.image_url)
              ) {
                num = array;
              }
            }
            console.log("foundation col", num);
            console.log("key", key);
            this.props.addCardToTableauColumn(draggedCard, key);
            this.props.removeCardFromFoundation(num);
          } else {
            let arr2 = this.props.tableau[parseInt(draggedCard.colkey)];
            let draggedCardNumIndex = arr2.findIndex(
              card => card.image_url === draggedCard.image_url
            );
            let draggedCards = arr2.slice(draggedCardNumIndex);
            let num = arr2.length - draggedCardNumIndex;
            this.props.addCardToTableauColumn(draggedCards, key);
            this.props.removeCardfromTableauColumn(draggedCard, num);
          }
        }
      }
    }

    // this.props.updateDraggedCard(card)
  };
  onDoubleClick = (ev, card, key) => {
    let arr = this.props.tableau[parseInt(key)];
    let last_card = arr[arr.length - 1];

    if (card.image_url == last_card.image_url) {
      this.props.revealCardInTableau(card, key);
    }
  };


  onLayoutDrop = (ev, stack) => {
    let draggedCard = JSON.parse(ev.dataTransfer.getData("card"));
    let stackindex = parseInt(stack) + 1;
    if (draggedCard.value == 13) {
      //if king

      if (
        this.props.discard
          .map(card => card.image_url)
          .includes(draggedCard.image_url)
      ) {
        this.props.addCardToTableauColumn(draggedCard, stackindex);
        this.props.removeCardFromDiscard();
      } else {
        let arr2 = this.props.tableau[parseInt(draggedCard.colkey)];
        let draggedCardNumIndex = arr2.findIndex(
          card => card.image_url === draggedCard.image_url
        );
        let draggedCards = arr2.slice(draggedCardNumIndex);
        let num = arr2.length - draggedCardNumIndex;
        this.props.addCardToTableauColumn(draggedCards, stackindex);
        this.props.removeCardfromTableauColumn(draggedCard, num);
      }
    }
  };

  renderTableauLayout = () => {
    let row = [];
    let left = 120;
    //orginally 600

    for (let i = 0; i < 7; i++) {
      let divStyle = {
        position: "absolute",
        width: "100px",
        height: "135px",
        top: "220px"
      };

      divStyle["left"] = left;
      left += 120;

      row.push(
        <p
          className="rectangle"
          key={i}
          onDragOver={e => this.onDragOver(e)}
          onDragStart={e => this.onDragStart(e)}
          onDrop={e => this.onLayoutDrop(e, `${i} stack`)}
          style={divStyle}
        />
      );
    }

    return row;
  };

  renderTableauCards = () => {
    let row = [];
    let left = 0;
    //200 orginally
    for (let key in this.props.tableau) {
      let topposition = 200;
      left += 120;

      for (let card of this.props.tableau[key]) {
        // let topposition = 0

        let divStyle = {
          position: "absolute",
          width: "100px",
          height: "135px"
        };
        topposition += 20;
        divStyle["top"] = topposition;
        divStyle["left"] = left;

        row.push(
          <img
            key={card.image_url}
            src={
              card.hidden
                ? process.env.PUBLIC_URL + "/backofcard.png"
                : process.env.PUBLIC_URL + `${card.image_url}`
            }
            onDragOver={e => this.onDragOver(e, card)}
            onDragStart={e => this.onDragStart(e, card, key)}
            draggable={card.hidden ? false : true}
            style={divStyle}
            onDrop={e => this.onDrop(e, card, key)}
            onDoubleClick={e => this.onDoubleClick(e, card, key)}
          />
        );
      }
    }
    return row;
  };


  render() {
    return (
      <div>
        {this.renderTableauLayout()}
        {this.renderTableauCards()}
      </div>
    );
  }
}

export default Tableau;
