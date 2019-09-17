export default class Store{
    getcards(){
        let cards;
        if (!localStorage.getItem("cards")) {
            cards = [];
          } else {
            cards = JSON.parse(localStorage.getItem("cards"));
          }
          return cards;
    }

    saveCard(card){
        let cards = this.getcards();
        cards.push(card);
        localStorage.setItem("cards", JSON.stringify(cards));
    }

    removeCard(title){
        let store = this.getcards();
  
        store.forEach((element, i) => {
          if (element.title === title) {
            store.splice(i, 1);
          }
        });
        localStorage.setItem("cards", JSON.stringify(store));
    }
    //
}