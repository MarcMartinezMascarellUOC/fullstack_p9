const express = require("express");
const router = express.Router();
const User = require('../models/usuarioSchema');

//Obtener todos los usuarios
router.route("/api/user/")
    .get(async(req, res, next)=> {
            try{
                const users = await User.find({})
                res.json(users);
            }catch(err){
                console.error(err.message)
                res.status(500).send({"error" : "Server Error"})
            }
        }
    )
    .post(async (req, res, next) => {
        //Crear nuevo usuario
        try{
          let username = req.body.username;
          let email = req.body.email;
          let password = req.body.password;

          const user = new User({username, email, password})

        await user.save()
        if (user.id){
            res.status(200).send({"msg" : "User created!", "content": user})

        } else {
            console.log('No user');
        }

        }catch(err){
          console.error(err.message)
          res.status(500).send({"error" : "Server Error"})
        }
      }
    );


    //Obtener usuario en concreto
    router.route("/api/user/:userId")
    .get( async(req, res, next)=> {
        try{
            const userId = req.params.userId;
            const user = await User.findOne({_id : userId});
            if(user){
                res.json(user);
            }else{
                res.status(404).send({"error" : "User not found"});
            }
        }catch(err){
            console.error(err.message);
            res.status(500).send({"error" : "Server Error"});
        }
    }
);

//Modificar usuario
router.put("/api/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        let body_request = req.body;

        const filter = { _id: userId };
        const update = { $set: body_request }


        let user = await User.findOneAndUpdate(filter, update);
        if (user) {
            res.status(202).send({ "msg": "User modified!", "content": user });
        } else {
            res.status(404).send({ "error": "User not found" });
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": "Server Error" })
    }
});


router.delete("/api/user/:userId", async(req, res) => {
    try {
      const userId = req.params.userId
      const user = await User.findOneAndDelete({_id: userId})
      if (user) {
        res.status(202).send({"msg": "User deleted!"})
      } else {
        res.status(404).send({"error": "User not found"})
      }  
    } catch (err) {
      console.log(err.message)
      res.status(500).send({"error": "Server error"})
    }
  })

module.exports = router;