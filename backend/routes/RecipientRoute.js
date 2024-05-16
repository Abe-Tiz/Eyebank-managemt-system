const express = require("express");
const router = express.Router();
const {
    createRecipient,
    getRecipients,
    getRecipient,
    updateRecipient,
    ocularPost,
    adverseReaction,
    deleteRecipient,
    SearchRecipient
} = require("../controller/RecipientController");
router.post("/create", createRecipient);
router.get("/read", getRecipients);
router.get("/getOne/:id", getRecipient);
router.put("/update/:id", updateRecipient);
router.put("/ocular/:id", ocularPost);
router.put("/adverse/:id", adverseReaction);
router.delete("/delete/:id", deleteRecipient);
router.post("/search", SearchRecipient);

module.exports = router;