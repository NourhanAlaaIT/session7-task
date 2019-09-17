//creat object
function Card(title, desc){
this.title = title;
this.desc = desc;
}

function UI() {}
UI.displayCard = function(cards){
    if(cards){
        cards.forEach(card =>  this.createCard(card));
    }
}

UI.createCard = data => {
    let card = UI.createElement("article", "card");
    let cardTitle = UI.createElement("h3", "card-title", data.title);
    let cardDesc = UI.createElement("p", "card-desc", data.desc);

    let removeButton = UI.createElement(
        "button",
        "cardRemove",
        '<i class="fa fa-trash-alt"></i>');

    card.appendChild(cardTitle);
    card.appendChild(cardDesc);
    card.appendChild(removeButton);
    document.querySelector(".cards").appendChild(card);
}

UI.createElement = (el, className, content) => {
    let element = document.createElement(el);
    element.className = className;
    if (content) element.innerHTML = content;
    return element;
}

UI.allert = function(className, content){
    let allertMsg = this.createElement("p", `${className}`, `${content}`);

    document
      .querySelector(".container")
      .insertBefore(allertMsg, document.querySelector("#toDoForm"));
  
    setTimeout(() => document.querySelector(`.${className}`).remove(), 2000);
}

UI.removeElement = target => {
    target.parentElement.remove();
}

function Store() {}

Store.prototype.getcards = () => {
    let cards;
    if (!localStorage.getItem("cards")) {
        cards = [];
      } else {
        cards = JSON.parse(localStorage.getItem("cards"));
      }
    
      return cards;
}

Store.prototype.saveCard = function(card){
    let cards = this.getcards();

    cards.push(card);
  
    localStorage.setItem("cards", JSON.stringify(cards));
}

Store.prototype.removeCard = function(title) {
    let store = this.getcards();
  
    store.forEach((element, i) => {
      if (element.title === title) {
        store.splice(i, 1);
      }
    });
  
    localStorage.setItem("cards", JSON.stringify(store));
  }

document.addEventListener("DOMContentLoaded", function() {
    UI.displayCard(Store.prototype.getcards());
  });

  document.querySelector("#toDoForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const title = document.querySelector("#title").value;
    const desc = document.querySelector("#desc").value;

    if (title === "" || desc === "") {
        UI.allert("error-message", "Please fill these fields");
        return;
      }

    let card = new Card(title, desc);

    UI.createCard(card);
    Store.prototype.saveCard(card);
    this.reset();
    UI.allert("success-message", "Card added successfully");  
});

  document.querySelector(".cards").addEventListener("click", e => {
    if (e.target.classList.contains("fa-trash-alt")) {
      Store.prototype.removeCard(
        e.target.parentElement.parentElement.querySelector(".card-title")
          .innerText
      );
  
      UI.removeElement(e.target.parentElement);
    }
  });