const Distribution = require('../models/CorneaDistribution');
const createDistribution = async (req, res) => {
    const { hospitalName, nameOfSurgeon, nameOfTransaction, typeOfTissue, processingFee, approvedBy, nameOfTechnician } = req.body;
    try {
        const distribution = await Distribution.create({
            hospitalName: hospitalName,
            nameOfSurgeon: nameOfSurgeon,
            nameOfTransaction: nameOfTransaction,
            typeOfTissue: typeOfTissue,
            processingFee: processingFee,
            approvedBy: approvedBy,
            nameOfTechnician: nameOfTechnician
        })
        if (distribution) {
            res.send({ status: "ok", data: distribution })
        }
    } catch (error) {
        throw error;
    }
}
module.exports = { createDistribution }