import React,{useState} from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { BiChevronDown } from "react-icons/bi";

import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";

const languageMap = {
    en: { label: "English", dir: "ltr", active: true },
    gr: { label: "German", dir: "ltr", active: false },
}


const LanguageSelect = () => {
    const selected = localStorage.getItem("i18nextLng") || "en";
    const { t } = useTranslation();

    const [menuItem, setMenuItem] = useState("en")
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    React.useEffect(() => {
        document.body.dir = languageMap[selected]?.dir;
    }, [menuAnchor, selected]);

    return (
        <div className="d-flex justify-content-center align-items-center language-select-root me-4">
            <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)} className="languageSelctBtn m-0 p-0 ">
                {/* {languageMap[selected].label} */}
                <span>{menuItem==="en"?"English":"German"} ({menuItem})</span>
                    <span className="Signup"><BiChevronDown /></span>
            </Button>
            <Popover
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <div className="">
                    <List className="drop_lang">
                        <ListSubheader>{t("select_language")}</ListSubheader>
                        {Object.keys(languageMap)?.map(item => (
                            <ListItem
                                button
                                key={item}
                                onClick={() => {
                                    i18next.changeLanguage(item);
                                    setMenuItem(item);
                                }}
                            >
                                {languageMap[item].label}
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Popover>
        </div>
    );
};

export default LanguageSelect;