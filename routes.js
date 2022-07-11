const express = require('express');
const ExpressError = require('./expressError');
const router = new express.Router();
const items = require("./fakeDb.js")


router.get("/", (req, res) => {
    return res.json(items)
})

router.post("/", (req, res, next) => {
    //Question: Why does curl accept json that is an object instead of a string? because I cant parse the json, which i think has something to do with it being labeled as an 'object', rather than a string. this makes sense as i entered it in insomnia as an object and not a string. 
    // console.log("#####", req.body, typeof (req.body))
    // const item = JSON.parse(req.body)
    try {
        if (!req.body.name) throw new ExpressError("Name is required", 404)
        const item = req.body
        items.push(item)
        return res.status(201).json({ "added": { "item": gummies } })
    } catch (err) {
        return next(err)
    }

    //Question: why is the variable name showing up in response?
})

router.get("/:name", (req, res, next) => {
    try {
        const found = items.find(element => element["name"] === req.params.name);
        if (!found) throw new ExpressError("Uh-Oh! Item not found!", 404)
        return res.json(found)
    } catch (err) {
        return next(err)
    }
})

router.patch("/:name", (req, res, next) => {
    try {
        const foundItem = items.find(item => item.name === req.params.name)
        if (!foundItem) throw new ExpressError("Uh-Oh! Item not found!", 404)
        foundItem.name = req.body.name;
        return res.json({ "updated": foundItem });
    } catch (err) {
        return next(err)
    }
})

router.delete(":/name", (req, res, next) => {
    console.log("delete route")
    try {
        const idx = items.findIndex(element => element["name"] === req.params.name);
        if (idx === -1) throw new ExpressError("Uh-Oh! Item not found!", 404)
        items.splice(idx, 1)
        console.log("$$$$$$$$$")
        return res.json({ message: "Deleted" })
    } catch (err) {
        return next(err)
    }
})



module.exports = router;
