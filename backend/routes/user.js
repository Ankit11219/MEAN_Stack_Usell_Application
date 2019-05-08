const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const router = express.Router();


 // Status code = 401-Authentication denied,404-Result not found,200-ok,201,request accepted updated


   /* In upper "password" is not encrypted form it means when hacker hack the database it means it will know the all users password
  to security purpose we use bcrypt-nodejs package "npm install --save bcrypt-nodejs"   */

  //Asyncronous call
  /* bcrypt.hash(req.body.password, null,null,callback(){
    store in data base
  }); */
  // Syncronous Call
  router.post("/signup",(req,res,next) => {
  let hash = bcrypt.hashSync(req.body.password);
    const user = new UserModel({
      email: req.body.email,
      password: hash,
      role: 'user',
      status: 0
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User Created!',
        result: result
      });
    }).catch(err => {
      res.status(500).json({
        message: 'Invalid authentication credentials!'
      });
    });
  });

  router.post('/login',(req,res,next) => {
    UserModel.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Authentication Failed!'
        });
      }
        result =  bcrypt.compareSync(req.body.password, user.password); //input is match return true else false
      if (!result) {
        return res.status(401).json({
          message: 'Authentication Failed Wrong Password!'
        });
      }
      /* In token = first_argument(input we want to send in browser),
                    second_argument('secret password only I knows in here i using "secret_password_I_generated"),
                    third_argument({ExpireIn:time to expire-how many time to token work in browser})*/
      const token = jwt.sign({email: user.email, userId: user._id}, "secret_this_should_be_longer",{ expiresIn: "1h" });
      res.status(200).json({
        token: token,
        expiresIn:3600,
        userId: user._id,
        role: user.role
      });
    }).catch(err => {
      return res.status(401).json({
        message: 'Invalid Authentication credentials!'
      });
    });
  });

module.exports = router;
