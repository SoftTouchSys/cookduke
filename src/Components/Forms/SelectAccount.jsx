import React from "react";
import FormsNavbar from "./FormsNavbar";
import FormsFooter from "./FormsFooter";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { SiCodechef } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SelectAccount = () => {
  const { t } = useTranslation();

  return (
    <>
      <FormsNavbar />
      <div className="select_account">
        <div className="check_your_email">
          <h3>{t("select_account_type")}</h3>
          <div className="select_account_boxes">
            <div className="Account-Type">
              <span>
                <GiForkKnifeSpoon />
              </span>
              <h4>{t("restaurant")}</h4>
            </div>
            <div className="Account-Type">
              <span>
                <SiCodechef />
              </span>
              <h4>{t("chef")}</h4>
            </div>
            <div className="Account-Type active">
              <span>
                <FaUser />
              </span>
              <h4>{t("select_account_type")}</h4>
            </div>
          </div>
        </div>
      </div>
      <FormsFooter />
    </>
  );
};

export default SelectAccount;
