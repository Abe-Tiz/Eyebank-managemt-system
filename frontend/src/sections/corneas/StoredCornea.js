import { useTranslation } from "react-i18next";

const StoredCornea = () => {
  const { t } = useTranslation();

  /*
        Lot Number: int
        Date of preservation: Date
        Expire date of tissue: Date
        DIN: int
        Product code: int
        FIN: int
    
    */

  return (
    <>
      <div className="container flex flex-col justify-center p-5 mt-5">
        <h3 className="title">Store Cornea</h3>
        <div className="form ">
          <form>
            <div className=" grid lg:grid-cols-2 gap-8 md:grid-cols-1 ">
              <div className="mt-4">
                <label
                  htmlFor="age"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("register:LabelsignUpName")}{" "}
                  <span class="text-red-500">*</span>
                </label>
                <div className="flex flex-col items-start">
                  <input
                    className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                    name="name"
                    type="text"
                    placeholder={t("common:namePlaceholderLabel")}
                    pattern="[a-zA-Z ]{6,}"
                    required
                  />
                  <span className="mt-1 hidden text-sm text-red-400">
                    {t("register:LabelFullNameError")}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("login:labelLoginEmail")}{" "}
                  <span class="text-red-500">*</span>
                </label>
                <div className="flex flex-col items-center">
                  <input
                    // value={email}
                    name="email"
                    type="email"
                    placeholder={t("common:emailPlaceholderLabel")}
                    // onChange={handleEmail}
                    className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                    autoComplete="off"
                    required
                    pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                  <span className="mt-1 hidden text-sm text-red-400">
                    {t("login:labelErrorEmail")}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="sex"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("register:LabelsignUpRole")}
                  <span class="text-red-500">*</span>
                </label>
                <select
                  name="sex"
                  className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60"
                  //   onChange={handleRole}
                >
                  <option>{t("register:LabelRoleSelect")}</option>
                  <option value="admin">{t("register:LabelAdmin")}</option>
                  <option value="lab Techinician">
                    {t("register:LabelLabTechinician")}
                  </option>
                  <option value="medical Director">
                    {t("register:LabelMedicalDirector")}
                  </option>
                  <option value="doctor">{t("register:LabelDoctor")}</option>
                </select>
                <span className="mt-1 hidden text-sm text-red-400">
                  {t("register:LabelRoleError")}
                </span>
              </div>

              {/* <ButtonComponent title={t("register:signUpLabel")} /> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StoredCornea;
