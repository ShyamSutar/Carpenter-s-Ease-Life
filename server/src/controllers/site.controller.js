import asyncHandler from "express-async-handler";
import Site from "../models/site.model.js";

const addSite = asyncHandler(async (req, res) => {
  const { siteName, location, profitPercentage } = req.body;

  const exists = await Site.findOne({ mistry: req.user._id, siteName });

  if (exists) {
    return res.status(400).json({ message: `${siteName} already exists` });
  }

  const response = await Site.create({
    mistry: req.user._id,
    siteName,
    location,
    profitPercentage,
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
  const sites = await Site.findOne({ _id: req.params.id })
    .populate({
      path: "plywood",
      populate: {
        path: "plywood",
      },
    })
    .populate({
      path: "hardware",
      populate: {
        path: "hardware",
      },
    })
    .populate("mistry")
  res.status(200).json(sites);
});

const fetchSiteHardware = asyncHandler(async (req, res) => {
  const sites = await Site.findOne({ _id: req.params.id }).populate({
    path: "hardware",
    populate: {
      path: "hardware",
    },
  });
  res.status(200).json(sites);
});

const fetchSitesPlywood = asyncHandler(async (req, res) => {
  const sites = await Site.find({ "plywood.plywood": req.user._id })
    .populate("mistry")
    .select("-hardware -client");
  res.status(200).json(sites);
});

const fetchSitesHardware = asyncHandler(async (req, res) => {
  const sites = await Site.find({ "hardware.hardware": req.user._id })
    .populate("mistry")
    .select("-plywood -client");
  res.status(200).json(sites);
});

const fetchSitesClient = asyncHandler(async (req, res) => {
  const sites = await Site.find({ "client.client": req.user._id })
    .populate("mistry")
    .select("-plywood -hardware");
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

const addHardwareDetails = asyncHandler(async (req, res) => {
  const { siteId, itemName, brand, size, quantity, unit, ratePerUnit } =
    req.body;

  const site = await Site.findOne({
    _id: siteId,
    "hardware.hardware": req.user._id,
  });

  const addDetails = await Site.findOneAndUpdate(
    { _id: siteId, "hardware.hardware": req.user._id },
    {
      $push: {
        "hardware.$.hardwareDetails": {
          itemName,
          brand,
          size,
          quantity,
          unit,
          ratePerUnit,
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

  res.json(site);
});

const fetchHardwareDetails = asyncHandler(async (req, res) => {
  const site = await Site.findOne(
    { _id: req.params.id, "hardware.hardware": req.user._id }, // Find site & dealer
    { "hardware.$": 1 } // Return only the matched dealer
  );

  res.json(site);
});

const updateTotal = asyncHandler(async (req, res) => {
  const updated = await Site.updateOne(
    { _id: req.params.id, "plywood.plywood": req.user._id },
    {
      $set: { "plywood.$.total": req.body.total },
    },
    { new: true }
  );

  res.status(200).json({ message: "updatedSuccessfully" });
});

const paymentPlywood = asyncHandler(async (req, res) => {
  const updated = await Site.updateOne(
    { _id: req.body.id, "plywood.plywood": req.body.plywoodId },
    {
      $push: {"plywood.$.paid": {amount: req.body.amount, paidDate: new Date() }},
    },
    { new: true }
  );

  if (updated.modifiedCount === 0) {
    return res.status(404).json({ message: "Plywood entry not found" });
  }

  res.status(200).json({ message: "Payment added successfully" });


});

const paymentHardware = asyncHandler(async (req, res) => {
  const updated = await Site.updateOne(
    { _id: req.body.id, "hardware.hardware": req.body.hardwareId },
    {
      $push: {"hardware.$.paid": {amount: req.body.amount, paidDate: new Date() }},
    },
    { new: true }
  );

  if (updated.modifiedCount === 0) {
    return res.status(404).json({ message: "Hardware entry not found" });
  }

  res.status(200).json({ message: "Hardware added successfully" });


});

const paymentMistry = asyncHandler(async (req, res) => {
  const updated = await Site.updateOne(
    { _id: req.body.id },
    {
      $push: {paid: {amount: req.body.amount, paidDate: new Date() }},
    },
    { new: true }
  );

  if (updated.modifiedCount === 0) {
    return res.status(404).json({ message: "Mistry entry not found" });
  }

  res.status(200).json({ message: "Mistry added successfully" });


});

const deletePlywood = asyncHandler(async (req, res) => {
  await Site.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "Removed Successfully" });
});

const editPlywood = asyncHandler(async (req, res) => {
  await Site.updateOne(
    { _id: req.params.id },
    {
      $set: {
        siteName: req.body.siteName,
        location: req.body.location,
      },
    }
  );

  res.status(200).json({ message: "data updated successfully" });
});

export {
  addSite,
  fetchSites,
  fetchSite,
  fetchSitesPlywood,
  addPlywoodDetails,
  fetchPlywoodDetails,
  updateTotal,
  deletePlywood,
  editPlywood,
  fetchSitesHardware,
  addHardwareDetails,
  fetchSiteHardware,
  fetchHardwareDetails,
  fetchSitesClient,
  paymentPlywood,
  paymentHardware,
  paymentMistry,
};
