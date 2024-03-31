import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHospital = () => {
    const [hospitalID, setHospitalID] = useState();
    const [hospitalName, setHospitalName] = useState();
    const [address, setAddress] = useState();
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:4000/hospital/create", {
                hospitalID,
                hospitalName,
                address,
            })
            .then((result) => {
                console.log(result);
                navigate("/adminDashboard/viewhospital");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="flex justify-center">
            <div className="w-1/2 rounded p-3">
                <form onSubmit={Submit}>
                    <h2 className="text-3xl font-bold text-center my-4">Add New Hospital</h2>
                    <div className="mb-2">
                        <label className="block">
                            Hospital ID:
                            <input
                                className="form-input mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                type="text"
                                value={hospitalID}
                                onChange={(e) => setHospitalID(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="block">Hospital Name</label>
                        <input
                            className="form-input mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            placeholder="Enter hospital name"
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block">Address</label>
                        <input
                            className="form-input mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn ml-6 w-50 btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddHospital;