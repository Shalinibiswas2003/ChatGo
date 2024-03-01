const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../handler/errorHandler");
const { userModel } = require("../models/userModel");



// Registration
const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const userModel = mongoose.model("Users");

  try {
    const getUsername = await userModel.findOne({ username: username });

    if (getUsername) {
      throw new Error("Username already present");
    }

    const getEmail = await userModel.findOne({ email: email });

    if (getEmail) {
      throw new Error("Email address already registered");
    }

    const hashedPass = await bcrypt.hash(password, 12);

    const user = await userModel.create({
      email: email,
      username: username,
      password: hashedPass,
    });

    res.status(200).json({
      status: true,
      message: 'Registration successful',
      data:user
    });
  } catch (error) {
    next(error); // Pass the error to Express error-handling middleware
  }
};

// Login
const login = async (req, res, next) => {
  const { username, password } = req.body;
  const userModel = mongoose.model("Users");

  try {
    const getUsername = await userModel.findOne({ username: username });
    

    if (!getUsername) {
      throw new Error("Username not registered");
    }

    const comparePass = await bcrypt.compare(password, getUsername.password);

    if (!comparePass) {
      throw new Error("Username and password do not match");
    }

    res.status(200).json({
      status: true,
      message: 'Login successful',
      data:getUsername
    });
  } catch (error) {
    next(error); // Pass the error to Express error-handling middleware
  }
};
const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userModel = mongoose.model("Users");
    const userData = await userModel.findByIdAndUpdate(
      userId,
      { isAvatar: true, avatar: avatarImage },
      { new: true } // To return the updated document
    );

    return res.json({
      isSet: userData.isAvatar,
      image: userData.avatar
    });
  } catch (error) {
    // Handle any errors
    next(error);
  }
}



//users
getAllUsers = async (req, res, next) => {
  try {
    const userModel = mongoose.model("Users");
    // Use the User model to find all users except the one with the specified ID
    const users = await userModel.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatar",
      "_id",
    ]);
    console.log(users);
    // Return the found users as JSON response
    return res.json(users);
  } catch (ex) {
    // If an error occurs, pass it to the next middleware in the chain
    next(ex);
  }
};



module.exports = { register, login ,setAvatar,getAllUsers};
