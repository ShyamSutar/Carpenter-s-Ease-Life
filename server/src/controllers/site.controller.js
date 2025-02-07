import asyncHandler from "express-async-handler";
import Site from "../models/site.model.js";

const addSite = asyncHandler(async(req, res)=>{
    const {siteName, location} = req.body;

    const exists = await Site.findOne({mistry: req.user._id, siteName})

    if(exists){
        return res.status(400).json({message: `${siteName} already exists`})
    }

    const response = await Site.create({mistry: req.user._id, siteName, location})

    res.status(200).json({
        message: "successfull",
        response
    })
})

const fetchSites = asyncHandler(async(req, res)=>{
    const sites = await Site.find({mistry: req.user._id});
    res.status(200).json(sites)
})

const fetchSite = asyncHandler(async(req, res)=>{
    const sites = await Site.findOne({_id: req.params.id});
    res.status(200).json(sites)
})

export {addSite, fetchSites, fetchSite};