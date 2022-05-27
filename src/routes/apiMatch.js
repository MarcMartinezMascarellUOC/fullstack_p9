const express = require("express");
const router = express.Router();
const Match = require('../models/matchSchema');


router.route("/api/match/")
    .post(async (req, res, next) => {
            try{
                let {matchId, roomId, playerOne, playerTwo, winner} = req.body

                const match = new Match({matchId, roomId, playerOne, playerTwo, winner})

                await match.save()
                if (match.id){
                    res.status(200).send({"msg" : "New Match saved!"})
                }

            }catch(err){
                console.error(err.message)
                res.status(500).send({"error" : "Server Error"})
            }
        }
    )
    .get(async (req, res) => {
        try {
            const match = await Match.find({})
            res.json(match)
        } catch (err) {
            console.error(err.message)
            res.status(500).send({ "error": "Server Error" })
        }
    }
    )

    module.exports = router; 