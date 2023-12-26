const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Person = require("./models/personModel");
require("dotenv").config();
const port = process.env.PORT || 3000;

// *******************************************************************
// Welcome message to test our server connection
app.get("/", (req, res) => {
  res.send("Welcome to Mongoose Checkpoint");
});
// ********************************************************************

// Connecting to MongoDB using the MONGO_URI environment-saved variable
async function begin() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () =>
      console.log(`Server listening on port ${port} and connected to database`)
    );
  } catch (err) {
    console.log(err);
  }
}
begin(); //run the startup process
// **********************************************************************

// ***********************************************************************
// Create a record in the database
const newPerson = new Person({
  name: "Akeem Bobola",
  age: 25,
  favoriteFoods: ["Amala", "Ewedu", "Gbegiri"],
});
// Save the record in the database
newPerson.save();
//The save() method no longer accepts a callback function.
// **************************************************************************

// **************************************************************************
// Declaration of anarray of many records (objects).
const arrayOfPeople = [
  {
    name: "Ibrahim Makarfi",
    age: 40,
    favoriteFoods: ["Tuwo", "Nunu", "Buritos"],
  },
  {
    name: "Tobechukwu",
    age: 28,
    favoriteFoods: ["Akpu", "Jollof Rice", "Buritos"],
  },
  {
    name: "Akpan",
    age: 50,
    favoriteFoods: ["Afang with dog meat", "Eba with edikainkon soup"],
  },
  {
    name: "Mary",
    age: 30,
    favoriteFoods: ["Rice", "Beans", "Plaintain"],
  },
];
//Creation of the records.
Person.create(arrayOfPeople)
  .then((createdPeople) => {
    console.log("Multiple people created:", createdPeople);
  })
  .catch((error) => {
    console.error("Error creating people:", error);
  });
// *****************************************************************

// *****************************************************************
// Using model.find() to find a person
Person.find({ name: "Tobechukwu" })
  .then((createdPeople) => {
    console.log("Tobechukwu found");
  })
  .catch((error) => {
    console.log("Tobechukwu not found");
  });
// *****************************************************************

// *****************************************************************
// Using model.findOne()
Person.findOne({ favoriteFoods: ["Tuwo", "Nunu"] })
  .then((person) => {
    console.log("Ibrahim Markarfi's data");
  })
  .catch((error) => {
    console.log("Ibrahim Markarfi's data not found");
  });
// *****************************************************************

// *****************************************************************
// Using model.findById() to find a record with a given id
const personId = "6588b00dfab261b15b224b7c";
Person.findById(personId);
// *****************************************************************

// *****************************************************************
// Performing Classic Updates
const personIdToUpdate = "6588b00dfab261b15b224b7c";
Person.findById(personIdToUpdate)
  //  findById() does not take a callback function, so a promise is used

  // Add "hamburger" to favoriteFoods with "push" and save.
  .then((person) => {
    person.favoriteFoods.push("hamburger");
    person.save();
  });
// ****************************************************

// *****************************************************
// Performing New Updates with findOneAndUpdate():
async function updatePersonAge(personName) {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName }, // Search condition
      { age: 20 }, // Field to be updated
      { new: true } // Options to return the updated document
    );

    if (updatedPerson) {
      // Document found and updated successfully
      console.log("Updated Person:", updatedPerson);
      return updatedPerson;
    } else {
      // Person with the specified name not found
      console.log("Person not found");
      return null;
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error; // Re-throw the error if needed
  }
}
const personNameToUpdate = "Tobechukwu";
updatePersonAge(personNameToUpdate);
// ***************************************************

// *****************************************************
// findByIdAndRemove() has been deprecated in favour of findByIdAndDelete() method
// So one document is found and deleted using model.findByIdAndDelete():
const personIdToDelete = "658897f97cabc5f2531ee184";
Person.findByIdAndDelete({ personIdToDelete });
// *********************************************************

// *************************************************************
//  model.remove() is not supported annymore
// Delete all people with the name "Mary"
Person.deleteMany({ name: "Mary" }).then(() =>
  console.log(`Deleted people with the name "Mary"`)
);
// ***************************************************************

// ***************************************************************
// Using Chain Search Query Helpers:
Person.find({ favoriteFoods: "burritos" }) //find people who like buritos
  .sort("name") //sort by name
  .limit(2) //limit the results to 2 documents
  .select("-age") //hide the age field
  .exec();
// ******************************************************************
