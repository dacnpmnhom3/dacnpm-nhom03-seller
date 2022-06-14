import React from "react";
import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";

const RadioBtn = ({ label, options, defaultValue, onChange }) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        name="radio-buttons-group"
        defaultValue={defaultValue}
        aria-labelledby="demo-radio-buttons-group-label"
        onChange={onChange}
      >
        {options?.map((option) => (
          <FormControlLabel
            key={option.label}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioBtn;
