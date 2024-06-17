import React from "react";
import { useTranslation } from "react-i18next";

const SearchComponent = ({ searchTerm, handleChange }) => {
    const { t } = useTranslation();
    
    return (
      <div className="dropdown dropdown-end">
        <input
          type="text"
          placeholder={t("donor:searchLabel")}
          className="input input-bordered w-24 md:w-auto"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
    );
};

export default SearchComponent;
