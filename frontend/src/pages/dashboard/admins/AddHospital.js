import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddHospital = () => {
    const [hospitalID, setHospitalID] = useState()
    const [hospitalName, setHospitalName] = useState()
    const [address, setAddress] = useState()
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/hospital/create",
            {
                hospitalID,
                hospitalName,
                address
            })
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2 className="text-center">Add Hospital</h2>

                    <div className="mb-2 ">
                        <label htmlFor="">Hospital ID</label>
                        <input
                            type="text"
                            placeholder="Enter hospital ID"
                            className="form-control"
                            value={hospitalID}
                            onChange={(e) => setHospitalID(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 ">
                        <label htmlFor="">Hospital Name</label>
                        <input
                            type="text"
                            placeholder="Enter hospital name"
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
                            placeholder="Enter address"
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
    )
}

export default AddHospital