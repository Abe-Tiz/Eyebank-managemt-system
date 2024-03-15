import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewHospital = () => {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/hospital/read")
            .then((result) => setHospitals(result.data))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios
            .delete("http://localhost:4000/deleteHospital/" + id)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-78 bg-white rounded p-3">
                <Link to="/adminDashboard" className="btn btn-success">
                    Back
                </Link>
                <h4 className="text-center text-black"> List of Hospitals</h4>

                <br />
                <table className="table table-hover">
                    {/* <caption>List of Hospitals</caption> */}
                    <thead className="thead-dark">
                        <tr>
                            {/* <th>Hospital ID</th> */}

                            <th>Hospital ID</th>
                            <th>Hospital Name</th>
                            <th>Address</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitals.map((hospital) => {
                            return (
                                <tr key={hospital._id}>
                                    {/* <td>{hospital.hospitalID}</td> */}

                                    <td>{hospital.hospitalId}</td>
                                    <td>{hospital.hospitalName}</td>
                                    <td>{hospital.address}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link to={`/adminDashboard/edithospital/${hospital._id}`} className="btn btn-success mr-2"> Edit  </Link>
                                            <button className="btn btn-danger mr-2" onClick={(e) => handleDelete(hospital._id)}> Delete </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ViewHospital;