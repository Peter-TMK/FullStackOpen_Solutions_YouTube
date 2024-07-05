const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();

const cors = require("cors");
const Person = require("./models/person");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Defining a custom token for morgan to log the request body for POST requests
morgan.token("req-body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

// Middleware for logging with custom format
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);
// Getting all persons

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
