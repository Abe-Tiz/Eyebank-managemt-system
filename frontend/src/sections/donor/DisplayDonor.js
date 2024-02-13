import React, { useEffect, useState } from 'react'
import axios  from 'axios';
import { Link } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
import { RiEdit2Line, RiDeleteBin2Line } from 'react-icons/ri'; 



const DisplayDonor = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const response = await axios.get("http://localhost:4000/donor");
        const donordata = response.data;

        // Check if the array is not empty
        if (donordata && donordata.length > 0) {
          const donors = donordata.map((donor) => donor);
          setLoading(true);
          setDonors(donors);
          console.log(donors);
        } else {
          console.log("Array is empty.");
          toast({
            title: "Empty Array",
            description: "Array is empty.",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.donordata.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    };

    fetchDonor();
  });

  return (
    <>
      {loading ? (
        <div className="m-10 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {t("register:LabelsignUpName")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("donor:donorCity")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("donor:donorMobile")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("donor:donorAction")}
                </th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr
                  key={donor.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {donor.name}
                      </div>
                      <div className="font-normal text-gray-500">
                        {donor.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{donor.city}</td>
                  <td className="px-6 py-4">
                    {donor.mobile}
                    {/* {donor.verified ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                        {t("donor:verifedStatus")}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                        {t("donor:pendingStatus")}
                      </div>
                    )} */}
                  </td>

                  <td className="flex px-6 py-4">
                    <Link
                      to={`/adminDashboard/edit/${donor._id}`}
                      className="flex items-center bg-transparent border-2 p-1  mr-5 font-medium text-white dark:text-blue-500 hover:bg-orange-700 hover:border-orange-700"
                    >
                      <RiEdit2Line size={20} color="#000" className="mr-2" />
                      {/* {t("common:updateButtonLabel")} */}
                    </Link>
                    <Link
                      to={`/delete/${donor._id}`}
                      className="flex items-center bg-transparent  border-2 p-1 font-medium text-white dark:text-blue-500 hover:bg-green-700 hover:border-green-700"
                    >
                      <RiDeleteBin2Line
                        size={20}
                        color="#000"
                        className="mr-2"
                      />
                      {/* {t("common:deleteButtonLabel")} */}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-blue-500 font-semibold text-lg">
          Loading....
        </div>
      )}

      {/* <Footer /> */}
    </>
  );
};

export default DisplayDonor
