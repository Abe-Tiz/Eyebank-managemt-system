import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditHospital = () => {
    const { id } = useParams();
    const [type, setType] = useState();
    const [hospitalName, setHospitalName] = useState();
    const [address, setAddress] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://eyebank-backend-2.onrender.com/hospital/getOne/${id}`)
            .then((result) => {
                console.log(result);
                setType(result.data.type);
                setHospitalName(result.data.hospitalName);
                setAddress(result.data.address);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const Update = (e) => {
        e.preventDefault();
        axios
            .put(`https://eyebank-backend-2.onrender.com/hospital/update/${id}`, {
                type,
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
            <div className="w-2/3 rounded p-3">
                <form onSubmit={Update}>
                    <h2 className="text-center text-3xl">Update Hospital</h2>

                    <div className="mb-4">
                        <label htmlFor="hospitalID">Hospital Type</label>
                        <input
                            type="text"
                            id="type"
                            className="form-input mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="hospitalName">Hospital Name</label>
                        <input
                            type="text"
                            id="hospitalName"
                            className="form-input mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="form-input mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-warning">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditHospital;