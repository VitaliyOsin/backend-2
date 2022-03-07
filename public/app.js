document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (type === "edit") {
    const id = event.target.dataset.id;
    const defaultText = event.target
      .closest("li")
      .querySelector("span").innerText;
    const title = prompt("Введите новое значение", defaultText);
    if (title === null) return;
    update(id, { title }).then(() => {
      event.target.closest("li").querySelector("span").innerText = title;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function update(id, payload) {
  const data = {
    id,
    payload,
  };
  try {
    await fetch(`/${JSON.stringify(data)}`, {
      method: "PUT",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}
