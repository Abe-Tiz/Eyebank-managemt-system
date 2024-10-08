const Cornea = require("../models/Cornea");
const Donor = require("../models/Donor");
const createCornea = async (req, res) => {
    //const { dateOfRecovery, recoveryTechnical, position, eyeLid, size, irisColor, corneaStatus, clarity, lens } = req.body;
    const cornea = new Cornea({
        examId: req.body.id,
        lotNo: req.body.lotNo,
        dateOfRecovery: req.body.dateOfRecovery,
        recoveryTechnical: req.body.recoveryTechnical,
        position: req.body.position,
        eyeLid: req.body.eyeLid,
        size: req.body.size,
        irisColor: req.body.irisColor,
        corneaStatus: req.body.corneaStatus,
        clarity: req.body.clarity,
        lens: req.body.lens,
        distributed: req.body.distributed,
        expirationDatee: req.body.expirationDatee,
        evaluation: {
            epitheliam: req.body.epitheliam,
            dateofEvaluation: req.body.dateofEvaluation,
            stroma: req.body.stroma,
            endothelium: req.body.endothelium,
            approval: req.body.approval,
            evaluater: req.body.evaluater
        }
    });
    
    try {
        const createdCornea = await cornea.save(); // Add await here
        res.send({ status: "ok", data: createdCornea });
    } catch (error) { // Add the error parameter here
        res.send({ status: "error", data: error });
    }
};

const getCorneas = async (req, res) => {
    try {
        const corneas = await Cornea.find({ expirationDate: { $lt: 14 } })
            .populate({ path: "recoveryTechnical" })
            // .populate({ path: "recoveryTechnical" });
        res.send(corneas);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving corneas");
    }
};

const getStoredCornea = async (req, res) => {
    const { id } = req.query;
    const corneas = await Cornea.find({ suiatablity: id });
    console.log("tefera");
    console.log(corneas);
    res.send(corneas);
};

const getCornea = async (req, res) => {
    const cornea = await Cornea.findById(req.params.id)
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
const DiscardCornea = async (req, res) => {
    const cornea = await Cornea.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.send(cornea);
};
const distributeCornea = async (req, res) => {
    const cornea = await Cornea.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.send(cornea);
};

const distributedCorneaController = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the donor by ID and update their verified status
        const distributed = await Cornea.findByIdAndUpdate(
            id,
            { distributed: true },
            { new: true }
        );

        if (!distributed) {
            return res.status(404).json({ message: "distributed is not found" });
        }

        res.status(200).json({ message: "distributed successfully", distributed });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const getCorneaBLotnum = async (req, res) => {
    try {
        const { lotNo } = req.body;
        const cornea = await Cornea.find({
            lotNo: { $regex: new RegExp(`^${lotNo}`, "i") },
        }).exec();
        if (cornea.length === 0) {
            return res.status(404).json({ message: "Cornea not found" });
        }
        // console.log(cornea);
        res.status(200).json(cornea);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
// const collectedCornea = async(req,res)=>{
//     const collect= await collect.findOneAndUpdate({_id:req.params.id},{$set:req.body})
//     res.send(collect)
//     }

module.exports = {
    createCornea,
    getCorneas,
    getCornea,
    editCornea,
    deleteCornea,
    evaluateCornea,
    distributeCornea,
    getCorneaBLotnum,
    getStoredCornea,
    distributedCorneaController,
    DiscardCornea,
};