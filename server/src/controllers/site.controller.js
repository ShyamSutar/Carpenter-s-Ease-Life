import asyncHandler from "express-async-handler";
import Site from "../models/site.model.js";

const addSite = asyncHandler(async (req, res) => {
  const { siteName, location } = req.body;

  const exists = await Site.findOne({ mistry: req.user._id, siteName });

  if (exists) {
    return res.status(400).json({ message: `${siteName} already exists` });
  }

  const response = await Site.create({
    mistry: req.user._id,
    siteName,
    location,
  });

  res.status(200).json({
    message: "successfully added site",
    response,
  });
});

const fetchSites = asyncHandler(async (req, res) => {
  const sites = await Site.find({ mistry: req.user._id });
  res.status(200).json(sites);
});

const fetchSite = asyncHandler(async (req, res) => {
  const sites = await Site.findOne({ _id: req.params.id }).populate({
    path: "plywood",
    populate: {
      path: "plywood"
    }
  });
  res.status(200).json(sites);
});

const fetchSitesPlywood = asyncHandler(async (req, res) => {
  const sites = await Site.find({ "plywood.plywood": req.user._id }).populate(
    "mistry"
  );
  res.status(200).json(sites);
});

const addPlywoodDetails = asyncHandler(async (req, res) => {
  const {
    siteId,
    plywoodType,
    brand,
    thickness,
    size,
    quantity,
    ratePerSheet,
  } = req.body;

  const site = await Site.findOne({
    _id: siteId,
    "plywood.plywood": req.user._id,
  });

  const addDetails = await Site.findOneAndUpdate(
    { _id: siteId, "plywood.plywood": req.user._id },
    {
      $push: {
        "plywood.$.plywoodDetails": {
          plywoodType,
          brand,
          thickness,
          size,
          quantity,
          ratePerSheet,
        },
      },
    },
    { new: true }
  );

  res.status(200).json({ message: "successful", addDetails });
});

const fetchPlywoodDetails = asyncHandler(async (req, res) => {
    const site = await Site.findOne(
        { _id: req.params.id, "plywood.plywood": req.user._id }, // Find site & dealer
        { "plywood.$": 1 } // Return only the matched dealer
      );
      
      res.json(site)
  });

const updateTotal = asyncHandler(async(req, res)=>{
  const updated = await Site.updateOne({_id: req.params.id, "plywood.plywood": req.user._id}, 
    {
    $set: { "plywood.$.total": req.body.total },
    },
  {new: true}
  )

  res.status(200).json({message: "updatedSuccessfully"})
})

export { addSite, fetchSites, fetchSite, fetchSitesPlywood, addPlywoodDetails, fetchPlywoodDetails, updateTotal };
