let savedTodos = localStorage.getItem("items")?.split(",");

let isEditing = false;
let todoIndex = null;

if (savedTodos === undefined) {
  savedTodos = [];
}
console.log(savedTodos.length);
let form = document.getElementById("todoForm");
let input = document.querySelector("input");
let ul = document.querySelector("ul");

form.onsubmit = (e) => {
  e.preventDefault();
  if (!isEditing) {
    savedTodos.push(new FormData(form)?.get("todo"));
  } else {
    savedTodos[todoIndex] = new FormData(form)?.get("todo");
  }
  window.localStorage.setItem("items", savedTodos);
  window.location.href = "/";
};

if (savedTodos.length < 1) {
  ul.innerHTML = `<p>No Todos items in the list.</p>`;
} else {
  for (let i = 0; i < savedTodos.length; i++) {
    ul.innerHTML += `<li><span>${savedTodos[i]}</span> <span><button style="margin-right: 5px;" onClick="Remove(${i});"><i class="fa-solid fa-trash"></i></button><button onClick="Edit(${i})"><i class="fa-solid fa-pen-to-square"></i></button></span></li>`;
  }
}

function Remove(index) {
  savedTodos.splice(index, 1);
  if (savedTodos.length < 1) {
    localStorage.removeItem("items");
  } else {
    window.localStorage.setItem("items", savedTodos);
  }
  window.location.href = "/";
}

function Edit(i) {
  isEditing = true;
  todoIndex = i;
  input.value = savedTodos[i];
}
