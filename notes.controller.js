const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = (await getNotes()) ?? [];
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(
    chalk.bgGreen(`Note - ${chalk.hex("#5c351a")(title)} - was added!`)
  );
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNote(id) {
  let notes = await getNotes();
  notes = notes.filter((note) => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(
    chalk.hex("#a21eb0")(
      `The note with id:${chalk.hex("#ef701c")(id)} is removed.`
    )
  );
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is a list of notes: "));
  notes.forEach((note, i) => {
    console.log(
      chalk.blue(
        `${i < 9 ? ` ${i + 1}` : i + 1}: ${chalk.green(
          note.id
        )}  ${chalk.bold.yellow(note.title)}`
      )
    );
  });
}

async function updateNote(id, payload) {
  let notes = await getNotes();
  notes = notes.map((n) => (n.id === id ? { ...n, ...payload } : n));
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(
    chalk.bgGreen(`Note with id: ${chalk.hex("#5c351a")(id)} was updated!`)
  );
}

module.exports = {
  addNote,
  removeNote,
  getNotes,
  updateNote,
};
