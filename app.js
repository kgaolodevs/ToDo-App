// Elements
const elements = {
  formInput: document.querySelector(".app__form--input"),
  formButton: document.querySelector(".app__form--btn"),
  list: document.querySelector(".app__list"),
  filterItems: document.querySelector(".app__select--filter"),
};

// Functions
const actions = {
  addItem: function (e) {
    e.preventDefault(); // Prevent form submission

    // List Div
    const listDiv = document.createElement("div");
    listDiv.classList.add("app__item");

    // Create list item
    const item = document.createElement("li");
    item.innerText = elements.formInput.value;
    item.classList.add("app__list--item");

    // Add item to local storage
    actions.saveItemsLocally(item.innerText);

    // Attach item to list div
    listDiv.appendChild(item);

    // Create checked button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("app__complete-Btn");

    // Attach checked button to list div
    listDiv.appendChild(completedButton);

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add("app__delete-Btn");

    // Attach delete button to list div
    listDiv.appendChild(deleteButton);

    // Attach div to the app list
    const appList = document.querySelector(".app__list");
    appList.appendChild(listDiv);

    elements.formInput.value = "";
  },
  deleteItem: function (e) {
    const element = e.target;

    // prettier-ignore
    if (element.classList[0] === "app__delete-Btn"){
      const parent = element.parentElement;
      

      // Animation
      parent.classList.add("deleteAnimation")
      parent.addEventListener("transitionend", function(){
        parent.remove();
      })

      actions.deleteLocalItem(parent.textContent)
    }
  },
  completedItem: function (e) {
    const triggerElement = e.target;
    // prettier-ignore
    if(triggerElement.classList[0] === "app__complete-Btn") triggerElement.parentElement.classList.toggle("completed");
  },
  filterItems: function (e) {
    const allItems = elements.list.childNodes;
    allItems.forEach(function (item) {
      switch (e.target.value) {
        case "all":
          item.style.display = "flex";
          break;
        case "completed":
          if (item.classList.contains("completed")) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
          break;
        case "todo":
          if (item.classList.contains("completed")) {
            item.style.display = "none";
          } else {
            item.style.display = "flex";
          }
          break;
      }
    });
  },
  saveItemsLocally: function (item) {
    // Check if local storage has existing items
    let allItems;
    if (localStorage.getItem("To do") === null) {
      allItems = [];
    } else {
      allItems = JSON.parse(localStorage.getItem("To do"));
    }

    allItems.push(item);

    let itemsData = JSON.stringify(allItems);
    localStorage.setItem("To do", itemsData);
  },
  retrieveLocalItems: function (e) {
    let allItems;
    if (localStorage.getItem("To do") === null) {
      allItems = [];
    } else {
      allItems = JSON.parse(localStorage.getItem("To do"));
    }

    allItems.forEach(function (todo) {
      // List Div
      const listDiv = document.createElement("div");
      listDiv.classList.add("app__item");

      // Create list item
      const item = document.createElement("li");
      item.innerText = todo;
      item.classList.add("app__list--item");

      // Attach item to list div
      listDiv.appendChild(item);

      // Create checked button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("app__complete-Btn");

      // Attach checked button to list div
      listDiv.appendChild(completedButton);

      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
      deleteButton.classList.add("app__delete-Btn");

      // Attach delete button to list div
      listDiv.appendChild(deleteButton);

      // Attach div to the app list
      const appList = document.querySelector(".app__list");
      appList.appendChild(listDiv);
    });
  },
  deleteLocalItem: function (item) {
    let retrievedItems = localStorage.getItem("To do");
    let convertedItems = JSON.parse(retrievedItems);
    let itemIndex = convertedItems.indexOf(item);
    if (itemIndex > -1) convertedItems.splice(itemIndex, 1);
    let newData = JSON.stringify(convertedItems);
    localStorage.setItem("To do", newData);
  },
};

// Event Listeners
elements.formButton.addEventListener("click", actions.addItem);
elements.list.addEventListener("click", actions.deleteItem);
elements.list.addEventListener("click", actions.completedItem);
elements.filterItems.addEventListener("click", actions.filterItems);
document.addEventListener("DOMContentLoaded", actions.retrieveLocalItems);
