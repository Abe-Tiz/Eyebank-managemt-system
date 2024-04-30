const Cornea = require('../models/Cornea');
const Distribution = require('../models/CorneaDistribution');
const createDistribution = async (req, res) => {
    const { hospitalName, name, modeOfTransportation, suiatablity } = req.body;
    try {
        const distribution = await Distribution.create({
            
            hospitalName: hospitalName,
            name: name,
            modeOfTransportation: modeOfTransportation,
            suiatablity:suiatablity
    
        })
        // distributed

        
        if (distribution) {
            
            res.send({ status: "ok", data: distribution })
        }
    } catch (error) {
        throw error;
    }
}
const getDistributeds = async (req, res) => {
    const distribute = await Distribution.find()
       
    res.send(distribute);
};

const getDistributed = async (req, res) => {
    const distribute = await Distribution.findById(req.params.id);
    res.send(distribute);
};
const editDistributed = async (req, res) => {
    const distribute = await Distribution.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.send(distribute);
};
const deleteDistributed = async (req, res) => {
    try {
        const { id } = req.params;
        // Assuming you have a Donor model
        await Distribution.deleteOne({ _id: id }); // Assuming the donor ID is stored in the "_id" field
        res.status(200).json({ message: "distribution  deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { createDistribution, getDistributeds, getDistributed, editDistributed, deleteDistributed }