class Card {
    constructor(title, desc){
    this.title = title;
    this.desc = desc;
    }
}
class UI {
    displayCards(cards){
        cards.forEach(card =>  this.createCard(card));
    }

    createCard(data){
        let { title, desc} = data;
        let card = this.createElement("article", "card");
        let cardTitle = this.createElement("h3", "card-title", data.title);
        let cardDesc = this.createElement("p", "card-desc", data.desc);
    
        let removeButton = this.createElement(
            "button",
            "cardRemove",
            '<i class="fa fa-trash-alt"></i>');
    
        card.appendChild(cardTitle);
        card.appendChild(cardDesc);
        card.appendChild(removeButton);
        document.querySelector(".cards").appendChild(card);
    }

    createElement(el, className, content){
        let element = document.createElement(el);
        element.className = className;
        if (content) element.innerHTML = content;
        return element;
    }

    removeElement(target){
        target.parentElement.remove();
    }

    allert(className, content){
        let allertMsg = this.createElement("p", `${className}`, `${content}`);

        document
          .querySelector(".container")
          .insertBefore(allertMsg, document.querySelector("#toDoForm"));
      
        setTimeout(() => document.querySelector(`.${className}`).remove(), 2000);
    }
}

class Store{
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

let ui = new UI();
let store = new Store();

document.addEventListener("DOMContentLoaded", function() {
    ui.displayCards(store.getcards());
});

document.querySelector("#toDoForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const title = document.querySelector("#title").value;
    const desc = document.querySelector("#desc").value;

    if (title === "" || desc === "") {
        ui.allert("error-message", "Please fill all fields");
        return;
      }

    let card = new Card(title, desc);

    ui.createCard(card);
    store.saveCard(card);
    this.reset();
    ui.allert("success-message", "Card added successfully");  
});

document.querySelector(".cards").addEventListener("click", e => {
    if (e.target.classList.contains("fa-trash-alt")) {
      store.removeCard(
        e.target.parentElement.parentElement.querySelector(".card-title")
          .innerText
      );
  
      ui.removeElement(e.target.parentElement);
    }
  });