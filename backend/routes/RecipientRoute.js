const RecipientController = require("../controller/RecipientController");
const express = require("express");
const route = express.Router();
route.post("/create", RecipientController.createRecipient);
route.get("/read", RecipientController.getRecipients);
route.get("/getOne/:id", RecipientController.getRecipient);
route.put("/update/:id", RecipientController.updateRecipient);
route.put("/ocular/:id", RecipientController.ocularPost);
route.put("/adverse/:id", RecipientController.adverseReaction);
route.delete("/delete/:id", RecipientController.deleteRecipient);

module.exports = route;