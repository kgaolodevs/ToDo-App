// Elements
const elements = {
  formInput: document.querySelector(".app__form--input"),
  formButton: document.querySelector(".app__form--btn"),
  list: document.querySelector(".app__list"),
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
    const triggerElement = e.target;

    // prettier-ignore
    if (triggerElement.classList[0] === "app__delete-Btn") triggerElement.parentElement.remove();
  },
  completedItem: function (e) {
    const triggerElement = e.target;
    // prettier-ignore
    if(triggerElement.classList[0] === "app__complete-Btn") triggerElement.parentElement.classList.toggle("completed");
  },
};

// Event Listeners
elements.formButton.addEventListener("click", actions.addItem);
elements.list.addEventListener("click", actions.deleteItem);
elements.list.addEventListener("click", actions.completedItem);
