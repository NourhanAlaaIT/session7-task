export default class UI {
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
