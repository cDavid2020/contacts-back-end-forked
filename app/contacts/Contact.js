import { Schema, model } from "mongoose";

export default model(
  "Contact",
  new Schema({
    // https://mongoosejs.com/docs/validation.html#validation
    fullName: { type: String, required: true },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already taken"],
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username must be at most 20 characters long"],
      trim: true,
    },
    phrase: String,
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
      validate: {
        validator(url) {
          return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
            url
          );
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
  })
);
