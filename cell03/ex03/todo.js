// Cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie =
    name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
  const key = name + "=";
  const parts = document.cookie.split(";");

  for (let i = 0; i < parts.length; i++) {
    let c = parts[i].trim();
    if (c.indexOf(key) === 0) {
      return decodeURIComponent(c.substring(key.length));
    }
  }
  return null;
}


const COOKIE_NAME = "ft_todos";
let todos = [];  

function saveTodos() {
  // store array as JSON string
  setCookie(COOKIE_NAME, JSON.stringify(todos), 365);
}

function loadTodos() {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((x) => typeof x === "string");
    }
  } catch (e) {
  }
  return [];
}

function createTodoElement(text) {
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;
  return div;
}

function renderAll() {
  const list = document.getElementById("ft_list");
  list.innerHTML = ""; // clear

// [newest, ..., oldest]
  for (let i = 0; i < todos.length; i++) {
    list.appendChild(createTodoElement(todos[i]));
  }
}

function addTodo(text) {
  // put to top of array
  todos.unshift(text);
  saveTodos();

  // put to top of DOM
  const list = document.getElementById("ft_list");
  list.prepend(createTodoElement(text));
}

function removeTodoByIndex(index) {
  todos.splice(index, 1);
  saveTodos();
  renderAll();
}

// main
document.addEventListener("DOMContentLoaded", () => {
  todos = loadTodos();
  renderAll();

  const newBtn = document.getElementById("newBtn");
  newBtn.addEventListener("click", () => {
    const text = prompt("Enter a new TO DO:");
    if (text === null) return; // pressed cancel

    const cleaned = text.trim();
    if (cleaned.length === 0) return; // ignore empty input

    addTodo(cleaned);
  });

  // remove
  const list = document.getElementById("ft_list");
  list.addEventListener("click", (e) => {
    const item = e.target.closest(".todo");
    if (!item) return;

    const ok = confirm("Do you want to remove this TO DO?");
    if (!ok) return;

    // find index by text + position 
    const text = item.textContent;
    const index = todos.indexOf(text);

    if (index !== -1) {
      removeTodoByIndex(index);
    } else {
      item.remove();
      saveTodos();
    }
  });
});
