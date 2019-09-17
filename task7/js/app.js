import Card from './card.js';
import UI from './ui.js';
import Store from './store.js';

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