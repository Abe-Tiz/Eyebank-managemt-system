const Cornea = require("../models/Cornea");
const createCornea = async (req, res) => {
    const cornea = new Cornea(req.body);
    try {
        const createdCornea = cornea.save()
        res.send({ status: "ok", data: createdCornea });
    } catch {
        error => {
            res.send({ status: "error", data: error });
        }
    }

}
module.exports = { createCornea }