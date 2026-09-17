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
  } catch (e) {}
  return [];
}

function createTodoElement(text) {
  return $("<div></div>").addClass("todo").text(text);
}

function renderAll() {
  const $list = $("#ft_list");
  $list.empty();

  // [newest, ..., oldest]
  for (let i = 0; i < todos.length; i++) {
    $list.append(createTodoElement(todos[i]));
  }
}

function addTodo(text) {
  todos.unshift(text);
  saveTodos();

  $("#ft_list").prepend(createTodoElement(text));
}

function removeTodoByIndex(index) {
  todos.splice(index, 1);
  saveTodos();
  renderAll();
}

// main (jQuery)
$(function () {
  todos = loadTodos();
  renderAll();

  // กดปุ่ม New
  $("#newBtn").on("click", function () {
    const text = prompt("Enter a new TO DO:");
    if (text === null) return;

    const cleaned = text.trim();
    if (cleaned.length === 0) return;

    addTodo(cleaned);
  });

  // ลบ todo 
  $("#ft_list").on("click", ".todo", function () {
    const ok = confirm("Do you want to remove this TO DO?");
    if (!ok) return;

    const text = $(this).text();
    const index = todos.indexOf(text);

    if (index !== -1) {
      removeTodoByIndex(index);
    } else {
      $(this).remove();
      saveTodos();
    }
  });
});
