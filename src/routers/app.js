const express = require("express");
require("../db/conn");

const MensRanking = require("../models/mens");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    res.send("Hello from the Arijit")
})

app.use(express.json());

// we will handle post list req
app.post("/mens", async (req, res) => {
    try {
        const arr = req.body["data"];
        console.log(arr.length)
        for (let i = 0; i < arr.length; i++) {
            const addingMensRecords = new MensRanking(req.body["data"][i]);
            const insertMens = await addingMensRecords.save();
            // res.send(insertMens);
        }
        res.send(req.body);
    } catch (e) {
        res.send(e);
    }
})

// we will handle post  req
app.post("/men", async (req, res) => {
    try {
        const addingMensRecords = new MensRanking(req.body);
        const insertMens = await addingMensRecords.save();
        res.send(insertMens);
    } catch (e) {
        res.send(e);
    }
})


// we will handle get req
app.get("/mens", async (req, res) => {
    try {
        const getMens = await MensRanking.find({}).sort({"ranking":1});
        res.status(201).send({"data":getMens});
    } catch (e) {
        res.status(400).send(e);
    }
})

// we will handle get req of indiv
app.get("/mens/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const getMen = await MensRanking.findById({ _id: id });
        res.send(getMen);
    } catch (e) {
        res.status(400).send(e);
    }
})

// we will handle patch req of indiv
app.patch("/mens/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const getMen = await MensRanking.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        res.send(getMen);
    } catch (e) {
        res.status(500).send(e);
    }
})

// we will handle delete req of indiv
app.delete("/mens/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const getMen = await MensRanking.findByIdAndDelete({ _id: id });
        res.send(getMen);
    } catch (e) {
        res.status(500).send(e);
    }
})

app.listen(port,
    () => {
        console.log(
            'connection is live at port no. ${port}' + port);
    })