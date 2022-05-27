const express = require("express");
const router = express.Router();
const Room = require('../models/roomSchema');






router.route("/api/room/")
    .get(async(req, res, next)=> {
            try{
                const room = await Room.find({})
                res.json(room)
            }catch(err){
                console.error(err.message)
                res.status(500).send({"error" : "Server Error"})
            }
        }
    )
    .post(async (req, res, next) => {
            try{
                let {name, players, playerOne, PlayerTwo} = req.body

                const room = new Room({name, players, playerOne, PlayerTwo})

                await room.save()
                if (room.id){
                    res.status(200).send({"msg" : "Room created!"})
                }

            }catch(err){
                console.error(err.message)
                res.status(500).send({"error" : "Server Error"})
            }
        }
    );


router.route("/api/room/:salaId")
    .get( async(req, res, next)=> {
            try{
                const id = req.params.salaId
                const room = await Room.findOne({_id : id})
                if(room){
                    res.json(room)
                }else{
                    res.status(404).send({"error" : "Room not found"})
                }
            }catch(err){
                console.error(err.message)
                res.status(500).send({"error" : "Server Error"})
            }
        }
    );



router.put("/api/room/:roomId", async (req, res) => {
    try {
        const roomId = req.params.roomId;
        let body_request = req.body
        const filter = { _id: roomId };
        const update = { $set: body_request }

        let room = await Room.findOneAndUpdate(filter, update, { new: true })
        if (room) {
            res.status(202).send({ "msg": "Room updated!" })
        } else {
            res.status(404).send({ "error": "Room not found" })
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": "Server Error" })
    }
});


router.delete("/api/room/:roomId", async(req, res) => {
    try {
        const roomId = req.params.roomId
        const room = await Room.findOneAndDelete({_id: roomId})
        if (room) {
            res.status(202).send({"msg": "Room deleted!"})
        } else {
            res.status(404).send({"error": "Room not found"})
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send({"error": "Server error"})
    }
})



module.exports = router;