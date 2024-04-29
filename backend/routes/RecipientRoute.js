const express = require("express");
const router = express.Router();
const {
    createRecipient,
    getRecipients,
    getRecipient,
    updateRecipient,
    ocularPost,
    adverseReaction,
    deleteRecipient
} = require("../controller/RecipientController");
router.post("/create", createRecipient);
router.get("/read", getRecipients);
router.get("/getOne/:id", getRecipient);
router.put("/update/:id", updateRecipient);
router.put("/ocular/:id", ocularPost);
router.put("/adverse/:id", adverseReaction);
router.delete("/delete/:id", deleteRecipient);

module.exports = router;