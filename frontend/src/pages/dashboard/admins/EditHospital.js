import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditHospital = () => {
    const { id } = useParams();
    const [hospitalID, setHospitalID] = useState()
    const [hospitalName, setHospitalName] = useState()
    const [address, setAddress] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get("http://localhost:4000/getHospital/" + id)
            .then((result) => {
                console.log(result);
                setHospitalID(result.data.hospitalID);
                setHospitalName(result.data.hospitalName);
                setAddress(result.data.address);

            })
            .catch((err) => console.log(err));
    }, [id]);
    // ,[]
    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:4000/updateHospital/" + id, {
            hospitalID,
            hospitalName,
            address
        })

            .then((result) => {
                console.log(result);
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>Update Hospital</h2>

                    <div className="mb-2">
                        <label htmlFor="">Hospital ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={hospitalID}
                            onChange={(e) => setHospitalID(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Hospital Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default EditHospital;