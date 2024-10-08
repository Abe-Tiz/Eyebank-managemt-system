    import { useToast } from "@chakra-ui/react";
    import React, { useState } from "react";
    import { useNavigate, useParams } from "react-router-dom";
    import { useTranslation } from "react-i18next";
    import axios from "axios";
    import ButtonPrimary from "./../../../../components/ButtonPrimary";
    import ButtonComponent from "./../../../../components/ButtonComponent";
    import useLoggedInUser from "../../../../useHooks/useLoggedInUser";

    const Test = () => {
    const [bloodType, setBloodType] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [tests, setTests] = useState([]);
    const [otherTestValue, setOtherTestValue] = useState("");
    const [isOtherChecked, setIsOtherChecked] = useState(false);
    const [reason, setReason] = useState("");
    const [isFailled, setIsFailled] = useState(false);
    const { user } = useLoggedInUser("lab");
    const { id } = useParams();
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();

    // console.log("user Id:",user.data._id);
    const validateBloodType = (type) => {
        const validTypes = ["A", "B", "O", "AB"];
        return validTypes.includes(type);
    };

    // Function to handle checkbox changes
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setTests((prevTests) => {
            if (checked && !prevTests.includes(name)) {
            return [...prevTests, `${name}  Negative`];
            }
            return prevTests.filter((test) => test !== name);
        });
    };
    //  function to handle other input field
    const handleOtherInputChange = (event) => {
        const value = event.target.value;
        setReason(value);
    };

    // console.log("reason:", reason);
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // tested cornea
        const data = {
        bloodType,
        userId: user && user.data._id,
        cornId: id,
        tests,
        };
        
        // discard cornea at serology test
        const discard = {
        reason,
        cornId: id
        };
      
        try {
        if (!isFailled) {
            const response = await axios.post(
            "https://eyebank-backend-2.onrender.com/blood/create",
            data
            );
            console.log(response.data);
            toast({
            title: "Data Registerd successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
            });
        } else {
            const response = await axios.post(
              "https://eyebank-backend-2.onrender.com/blood/discard",
              discard
            );
            console.log(response.data);
            toast({
            title: "Data Registerd successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
            });
        }

        navigate("/labtechnicaldashboard/list-serology");
        } catch (err) {
        console.log(err);
        }
    };
    return (
      <>
        <div className="mt-[-2]  items-center">
          <h2 className="text-sm ">Welcome to Serology Test Form</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col items-start ">
              <label className="label cursor-pointer gap-3">
                <input
                  type="checkbox"
                  name="fail"
                  checked={isFailled}
                  onChange={() => setIsFailled(!isFailled)}
                  className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
                />
                {t("serology:failled")} ?
              </label>
            </div>

            {!isFailled && (
              <div className="flex gap-10">
                <div className="flex   gap-3 flex-wrap md:mr-4">
                  <div className="mt-4">
                    <label
                      htmlFor="blood"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Blood Type:
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-start">
                      <select
                        name="blood"
                        className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block"
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                        required
                      >
                        <option value="">-- Select Blood type --</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="O">O</option>
                        <option value="AB">AB</option>
                      </select>
                      {/* Blood type validation message */}
                      {!validateBloodType(bloodType) && (
                        <span className="text-red-500">
                          please Select blood type
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap md:mr-4 mt-2">
                  <div className="mt-4 flex gap-5">
                    <label
                      htmlFor="sex"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("serology:testTitle")}:
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col md:flex-row md:gap-5 gap-0">
                      <div className="flex flex-col items-start">
                        <label className="label cursor-pointer gap-3">
                          <input
                            type="checkbox"
                            name="hiv"
                            checked={tests.hiv}
                            onChange={handleCheckboxChange}
                            className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
                          />
                          {t("serology:hiv")}
                        </label>
                        <label className="label cursor-pointer gap-3">
                          <input
                            type="checkbox"
                            name="hepatitisB"
                            checked={tests.hepatitisB}
                            onChange={handleCheckboxChange}
                            className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
                          />
                          {t("serology:hepatitusb")}
                        </label>
                      </div>
                      <div className="flex flex-col items-start ">
                        <label className="label cursor-pointer gap-3">
                          <input
                            type="checkbox"
                            name="syphilis"
                            checked={tests.syphilis}
                            onChange={handleCheckboxChange}
                            className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
                          />
                          {t("serology:syphilis")}
                        </label>
                        <label className="label cursor-pointer gap-3">
                          <input
                            type="checkbox"
                            name="hepatitisC"
                            checked={tests.hepatitisC}
                            onChange={handleCheckboxChange}
                            className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
                          />
                          {t("serology:hepatitusc")}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isFailled && (
              <div className="flex flex-col items-start ">
                <label className="label cursor-pointer gap-3">
                  {" "}
                  {t("serology:reason")}
                </label>

                <input
                  name="reason"
                  id="reason"
                  placeholder={t("serology:reasonplaceholder")}
                  onChange={handleOtherInputChange}
                  className="-mt-[50px] ml-[100px] block w-auto  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                />
              </div>
            )}

            {/* btn */}
            <div className=" flex flex-row md:flex-col text-center mt-4 ">
              <ButtonPrimary onClick={() => navigate(-1)} title="Back" />

              <ButtonComponent
                customClass="w-64 justify-center  mb-3"
                title={t("serology:save")}
              />
            </div>
          </form>
        </div>
      </>
    );
    };

    export default Test;
