// Importing material ui
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Textfield } from "../../../../Styles-Elements/Inputs";
import searchIcon from "../../../../image-assets/structure/search-icon.svg";
import GigActiveSingleDay from "./gig-active-signleday/GigActiveSingleDay";
import GigActiveMultipleDay from "./gig-active-multipleday/GigActiveMultipleDay";
import "../../GIGS.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function GigActiveList(props) {
  const [value, setValue] = React.useState(0);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event, newValue) => {
    setSearchValue("");
    setValue(newValue);
  };

  const [suggestions, setSuggestions] = useState("");

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  const handleChangeValue = (value) => {
    setSuggestions(value);
  };

  const optimizedFn = useCallback(debounce(handleChangeValue), []);

  return (
    <div className="main-app-grid">
      <div className="gigactive-main-holder">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab color={"#393939"} label="Single Day" {...a11yProps(0)} />
              <Tab label="Multiple Day" {...a11yProps(1)} />
            </Tabs>
            <div
              className="grid-item filtercol filtercol-search"
              //style={{ position: "absolute", right: "0px", top: "0px" }}
            >
              <Textfield
                className="textfield"
                placeholder={"Search..."}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{ padding: "10px 16px 10px 36px" }}
              />
              <img src={searchIcon} alt="name" className={"filtersearchicon"} />
            </div>
          </Box>
          <TabPanel className={"tabpanels"} value={value} index={0}>
            <GigActiveSingleDay
              search={searchValue}
              suggestions={suggestions}
            />
          </TabPanel>
          <TabPanel className={"tabpanels"} value={value} index={1}>
            <GigActiveMultipleDay
              search={searchValue}
              suggestions={suggestions}
            />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default GigActiveList;
