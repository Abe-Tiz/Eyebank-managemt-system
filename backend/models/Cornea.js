const mongoose = require('mongoose');
const corneaSchema = new mongoose.Schema({
    dateOfRecovery: String,
    recoverySite: String,
    recoveryTechnical: String,
    serologyTest: String,
    covid: String,
    corneaEvaluation: String,
    distributionDate: String,
    surgeonName: String,
    surgeonType: String,
    hospitalStatus: String,
    deliveryBy: String,
    transportationMode: String,
    remark: String
});
const Cornea = mongoose.model('cornea', corneaSchema);
module.exports = Cornea