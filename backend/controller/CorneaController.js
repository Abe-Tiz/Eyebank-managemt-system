const Cornea = require("../models/Cornea");
const Donor = require("../models/Donor");
const createCornea = async (req, res) => {
    const { DonorId, nameOfSurgeon, date, Position, EyeLid, size, IrisColor, CorneaStatus, Clarity, Lens, evaluation } = req.body;
    const cornea = new Cornea({
        DonorId,
        nameOfSurgeon,
        date,
        Position,
        EyeLid,
        size,
        IrisColor,
        CorneaStatus,
        Clarity,
        Lens,
        evaluation,
    });
    try {
        const createdCornea = await cornea.save(); // Add await here
        res.send({ status: "ok", data: createdCornea });
    } catch (error) { // Add the error parameter here
        res.send({ status: "error", data: error });
    }
};

const getCorneas = async (req, res) => {
    const corneas = await Cornea.find();
    res.send(corneas);
};

const getCornea = async (req, res) => {
    const cornea = await Cornea.findById(req.params.id);
    res.send(cornea);
};

const editCornea = async (req, res) => {
    const cornea = await Cornea.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.send(cornea);
};

const deleteCornea = async (req, res) => {
    try {
        const { id } = req.params;

        // Assuming you have a Donor model
        await Cornea.deleteOne({ _id: id }); // Assuming the donor ID is stored in the "_id" field
        res.status(200).json({ message: "Cornea deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const evaluateCornea = async (req, res) => {
    const cornea = await Cornea.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.send(cornea);
};


module.exports = { createCornea, getCorneas, getCornea, editCornea, deleteCornea, evaluateCornea };