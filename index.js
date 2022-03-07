const path = require("path");
const chalk = require("chalk");
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require("./notes.controller");
const express = require("express");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  let isCreated = false;
  if (req.body.title) {
    await addNote(req.body.title);
    isCreated = true;
  }

  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: isCreated,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:data", async (req, res) => {
  const { id, payload } = JSON.parse(req.params.data);
  console.log(id, payload);
  await updateNote(id, payload);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port} ...`));
});
