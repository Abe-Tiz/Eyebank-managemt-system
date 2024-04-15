import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IconButton, Button } from "@chakra-ui/react";
import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
            .delete(`http://localhost:4000/hospital/delete/${id}`)
            .then((res) => {
                console.log(res);
                //window.location.reload();
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="flex justify-center">
            <div className="w-2/3 rounded p-3">
                <Link to="/adminDashboard" className="btn btn-success mb-4">
                    <IconButton
                        as={Link}
                        to="/adminDashboard"
                        colorScheme="success"
                        aria-label="Back"
                        icon={<ArrowBackIcon />}
                        mb={3}
                    />
                </Link>
                <h4 className="text-center text-black mb-4">List of Hospitals</h4>

                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
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
                                    <td>{hospital.hospitalId}</td>
                                    <td>{hospital.hospitalName}</td>
                                    <td>{hospital.address}</td>
                                    <td>
                                        <div className="flex gap-2 justify-center">
                                            <Link
                                                to={`/ adminDashboard / edithospital / ${hospital._id}`}
                                                className="btn btn-success"
                                            >
                                                <EditIcon />
                                            </Link>
                                            <Button
                                                colorScheme="red"
                                                onClick={(e) => handleDelete(hospital._id)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewHospital;