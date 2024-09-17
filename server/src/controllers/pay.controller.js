import asyncHandler from "express-async-handler";

const updatePay = asyncHandler(async (req, res) => {
    const pay  = req.body;
  
    

    // const updateUser = await User.findByIdAndUpdate(req.params.id, pay, { new: true });
    
    // if (!updateUser) return res.status(404).send("User not found");
  
    res.status(200).json({ message: "successfully updated" });
  });

export { updatePay };
