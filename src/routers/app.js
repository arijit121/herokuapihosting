import express, { json } from "express";
import "../db/conn.js";

import MensRanking from "../models/mens.js";
import address from "address";
import fileupload from "express-fileupload";

const app = express();
const port = process.env.PORT || 3000;
const socket_port = process.env.PORT || 4000;

import { Server } from "socket.io";

const io = new Server(socket_port);

import { v4 as uuidv4 } from 'uuid';
import { ExpressPeerServer } from 'peer';
const peer_value = ExpressPeerServer(socket_port , {
  debug:true
});
// app.use('/peerjs', peer_value)

app.get("/", async (req, res) => {
    res.send("Hello from the Arijit")
})

app.use(json(), fileupload({
    limits: {
        fileSize: 10000000, // Around 10MB
    },
    abortOnLimit: true,
}));

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
        const getMens = await find({}).sort({ "ranking": 1 });
        res.status(201).send({ "data": getMens });
    } catch (e) {
        res.status(400).send(e);
    }
})

// we will handle get req of indiv
app.get("/mens/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const getMen = await findById({ _id: id });
        res.send(getMen);
    } catch (e) {
        res.status(400).send(e);
    }
})

// we will handle patch req of indiv
app.patch("/mens/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const getMen = await findByIdAndUpdate({ _id: id }, req.body, { new: true });
        res.send(getMen);
    } catch (e) {
        res.status(500).send(e);
    }
})

// we will handle delete req of indiv
app.delete("/mens/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const getMen = await findByIdAndDelete({ _id: id });
        res.send(getMen);
    } catch (e) {
        res.status(500).send(e);
    }
})

app.post('/upload', (req, res) => {

    // Get the file that was set to our field named "image"
    var image = req.files;

    // If no image submitted, exit
    if (!image)
        res.status(400).send({ "status": "false", "data": "Image Not Found" });

    // If does not have image mime type prevent from uploading
    if (/^image/.test(image.mimetype))
        res.status(400).send({ "status": "false", "data": "Image Not Be Uploded" });

    // Move the uploaded image to our upload folder

    // Use the mv() method to place the file somewhere on your server
    for (var key in image) {

        var thisFile = image[key];
        var name = new Date().getTime();
      
        if (thisFile[0] != undefined) {
           var imagelist = new Array();
            for (var i = 0; i < thisFile.length; i++) {
                thisFile[i].mv('./assets/' + name + thisFile[i].name, function (err) {
                    if (err) {
                        return res.status(400).send({ "status": "false", "data": "Image Not Uploded" });;
                    }

                });
                imagelist.push(`http://${address.ip()}:${port}/assets_folder/${name + thisFile[i].name}`);
            }

            res.status(200).send({ "status": "File uploaded!", "file_links": imagelist });
        } else {
            thisFile.mv('./assets/' + name + thisFile.name, function (err) {
                if (err) {
                    return res.status(400).send({ "status": "false", "data": "Image Not Uploded" });;
                }

            });
            res.status(200).send({ "status": "File uploaded!", "file_link": `http://${address.ip()}:${port}/assets_folder/${name + thisFile.name}` });
        }
    }



    // image.mv("assets"  + image.name);

    // All good
    // res.sendStatus(200);
});

app.use("/assets_folder", express.static("assets"));

app.listen(port,
    () => {
        console.log(
            `http://${address.ip()}:${port}`);
    })