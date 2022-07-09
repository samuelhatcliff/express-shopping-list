const express = require('express');
const app = require('./app');
const router = new express.Router();
const items = require("./fakeDb.js")


router.get("/", (req, res) => {
    return res.json(items)
})

router.post("/", (req, res) => {
    //Question: Why does curl accept json that is an object instead of a string? because I cant parse the json, which i think has something to do with it being labeled as an 'object', rather than a string. this makes sense as i entered it in insomnia as an object and not a string. 
    // console.log("#####", req.body, typeof (req.body))
    // const item = JSON.parse(req.body)
    const item = req.body
    items.push(item)
    return res.json({ "added": { item } })
    //Question: why is the variable name showing up in response?
})

router.get("/:name", (req, res) => {
    const found = items.find(element => element["name"] === req.params.name);
    return res.json(found)
})

router.patch("/:name", (req, res) => {
    for (let item of items) {
        if (item["name"] === req.body["name"]) {
            item = req.body;
            return res.json({ "updated": { item } });
        }
    }
})

router.delete(":/name", (req, res) => {
    console.log("delete route")
    let idx;
    items.forEach(element, index => {
        if (element["name"] === req.params.name) {
            idx = index
        }
    }
    );
    items.splice(idx, 1)
    console.log(items)
    return res.json({ message: "Deleted" })
})


module.exports = router;
