const mongoose = require('mongoose');

//Creation of personSchema object
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});

const Person = mongoose.model("Person", personSchema); //The schema is turned into a Person model

module.exports = Person; //Exportation of Person model for use in other modules
