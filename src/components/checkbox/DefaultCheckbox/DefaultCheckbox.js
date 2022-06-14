import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const DefaultCheckbox = () => {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
    </FormGroup>
  );
};

export default DefaultCheckbox;
