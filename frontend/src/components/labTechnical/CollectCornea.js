
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../static/styles/cornea.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
const CollectCornea = () => {
    const [serNo, setSerNo] = useState('');
    const [dateOfRecovery, setDateOfRecovery] = useState('');
    const [recoverySite, setRecoverySite] = useState('');
    const [recoveryTechnical, setRecoveryTechnical] = useState('');
    const [serologyTest, setSerologyTest] = useState('');
    const [covid, setCovid] = useState('');
    const [corneaEvaluation, setCorneaEvaluation] = useState('');
    const [distributionDate, setDistributionDate] = useState('');
    const [surgeonName, setSurgeonName] = useState('');
    const [surgeonType, setSurgeonType] = useState('');
    const [hospitalStatus, setHospitalStatus] = useState('');
    const [deliveryBy, setDeliveryBy] = useState('');
    const [transportationMode, setTransportationMode] = useState('');
    const [remark, setRemark] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            serNo,
            dateOfRecovery,
            recoverySite,
            recoveryTechnical,
            serologyTest,
            covid,
            corneaEvaluation,
            distributionDate,
            surgeonName,
            surgeonType,
            hospitalStatus,
            deliveryBy,
            transportationMode,
            remark
        }

        try {
            const response = await axios.post('http://localhost:4000/cornea/create', data);
            console.log(response.data);
            toast({
                title: "Data Registerd successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            navigate('/labtechnicaldashboard/viewCornea');
        }
        catch (err) {
            console.log(err);
        }

    };
    const handleDateOfRecoveryChange = (e) => {
        const inputValue = e.target.value;
        const modifiedValue = `ET${inputValue}`;

        setDateOfRecovery(modifiedValue);
    };
    const handleRecoverySite = (e) => {
        const data = e.target.value;
        if (!data) {
            alert("Please select a recovery site");
        } else {
            setRecoverySite(e.target.value);
        }
    }
    return (
        <div>
            <h2 className="header" style={{ textAlign: 'center' }}>Welcome to Collect Cornea Form</h2>
            <form onSubmit={handleFormSubmit}>

                <label>
                    Date of Recovery:
                    <input
                        type="date"
                        value={dateOfRecovery}
                        onChange={handleDateOfRecoveryChange}
                        className="form-input mt-1 block w-full"
                    />
                </label>
                <label>
                    Recovery Site:
                    <select value={recoverySite} onChange={handleRecoverySite}>
                        <option value="">Select Recovery Site</option>
                        <option value="Site 1">Site 1</option>
                        <option value="Site 2">Site 2</option>
                        <option value="Site 3">Site 3</option>
                    </select>
                </label>
                <label>
                    Recovery Technical:
                    <select
                        value={recoveryTechnical}
                        onChange={(e) => setRecoveryTechnical(e.target.value)}
                    >
                        <option value="">Select Recovery Technical</option>
                        <option value="Technical 1">Technical 1</option>
                        <option value="Technical 2">Technical 2</option>
                        <option value="Technical 3">Technical 3</option>
                    </select>
                </label>
                <label>
                    Serology Test:
                    <select value={serologyTest} onChange={(e) => setSerologyTest(e.target.value)}>
                        <option value="">Select Serology Test</option>
                        <option value="Test 1">Test 1</option>
                        <option value="Test 2">Test 2</option>
                        <option value="Test 3">Test 3</option>
                    </select>
                </label>
                <label>
                    Covid:
                    <select value={covid} onChange={(e) => setCovid(e.target.value)}>
                        <option value="">Select Covid</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <label>
                    Cornea Evaluation:
                    <select
                        value={corneaEvaluation}
                        onChange={(e) => setCorneaEvaluation(e.target.value)}
                    >
                        <option value="">Select Cornea Evaluation</option>
                        <option value="Evaluation 1">Evaluation 1</option>
                        <option value="Evaluation 2">Evaluation 2</option>
                        <option value="Evaluation 3">Evaluation 3</option>
                    </select>
                </label>
                <label>
                    Distribution Date:
                    <input
                        type="date"
                        value={distributionDate}
                        onChange={(e) => setDistributionDate(e.target.value)}
                    />
                </label>
                <label>
                    Name of Surgeon:
                    <input
                        type="text"
                        value={surgeonName}
                        onChange={(e) => setSurgeonName(e.target.value)}
                    />
                </label>
                <label>
                    Type of Surgeon:
                    <input
                        type="text"
                        value={surgeonType}
                        onChange={(e) => setSurgeonType(e.target.value)}
                    />
                </label>
                <label>
                    Hospital Status:
                    <select value={hospitalStatus} onChange={(e) => setHospitalStatus(e.target.value)}>
                        <option value="">Select Hospital Status</option>
                        <option value="Status 1">Status 1</option>
                        <option value="Status 2">Status 2</option>
                        <option value="Status 3">Status 3</option>
                    </select>
                </label>
                <label>
                    Delivery By:
                    <input type="text" value={deliveryBy} onChange={(e) => setDeliveryBy(e.target.value)} />
                </label>
                <label>
                    Mode of Transportation:
                    <input
                        type="text"
                        value={transportationMode}
                        onChange={(e) => setTransportationMode(e.target.value)}
                    />
                </label>
                <label>
                    Remark:
                    <input type="text" value={remark} onChange={(e) => setRemark(e.target.value)} />
                </label>
                <button type="submit">Add Cornea</button>
                <div className="mt-6">
                    <button
                        onClick={handleFormSubmit}
                        type="submit"
                        className="w-1/3 mr-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
                    >
                        Add Cornea
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CollectCornea;