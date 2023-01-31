import { model, Schema } from "mongoose";

export default model(
  "Contact",
  new Schema({
    // Full name field of the Contact model
    fullName: {
      type: String,
      required: [true, "Full name is required!"]
    },
    // username field of the Contact model
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already taken"],
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username must be at most 20 characters long"],
      trim: true,
    },
    // phrase field of the Contact model
    phrase: String,
    // avatar field of the Contact model
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
      validate: {
        validator(url) {
          // This function validates the URL
          return url.startsWith("http");
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
  })
);

////////////////////////////////////////////

/*
This code sets up a MongoDB database using Mongoose, a popular Node.js library for working with MongoDB. The code sets up a "Contact" model, with various fields and validation rules.

    The first line imports the model and Schema classes from the mongoose library.
    The model function creates a new Mongoose model, which represents a collection in the MongoDB database. The first argument to model is the name of the collection ("Contact"), and the second argument is the schema for the collection.
    The new Schema syntax creates a new Mongoose schema, which defines the fields and validation rules for the "Contact" model.
    The fullName field is of type String, and has a required validation rule with a custom error message. If a "Contact" document is saved without a fullName, Mongoose will return the error message "Full name is required!".
    The username field is of type String, and has multiple validation rules:
        It is required with a custom error message.
        It is unique with a custom error message.
        It has a minlength validation rule with a custom error message.
        It has a maxlength validation rule with a custom error message.
        It has a trim option, which automatically trims any whitespace from the beginning or end of the string before saving it.
    The phrase field is of type String and has no validation rules.
    The avatar field is of type String, with a default value set to a URL for an avatar image. It has a custom validate function that checks if the URL starts with "http". If the validation fails, it returns a custom error message.


 */