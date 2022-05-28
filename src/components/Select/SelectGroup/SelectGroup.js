import React from "react";
import Select from "react-select";
import { green, grey } from "@mui/material/colors";

import "./styles.css";

const customStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "8px",
    boxShadow: state.isFocused ? null : null,
    border: state.isFocused && `2px solid ${green[500]}`,
    borderColor: state.isFocused ? green[500] : grey[300],
    "&:hover": {
      borderColor: state.isFocused ? green[500] : "black",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 2,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "12px 14px",
  }),
};

const SelectGroup = ({ placeholder, options, onChange, onBlur, error }) => {
  return (
    <Select
      options={options}
      styles={customStyles}
      classNamePrefix="react-select"
      placeholder={placeholder || "Select..."}
      className={error ? "select-group--error" : ""}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

export default SelectGroup;
