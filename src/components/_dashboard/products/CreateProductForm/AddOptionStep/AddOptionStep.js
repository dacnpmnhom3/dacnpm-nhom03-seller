import React, { memo } from "react";
import { StepLabel, StepContent, Stack } from "@mui/material";

import FormikRadioBtn from "components/button/FormikRadioBtn";

const options = [
  {
    value: false,
    label: "No option",
  },
  {
    value: true,
    label: "Have many options",
  },
];

const AddOptionStep = ({ typeField, haveManyOptions }) => {
  return (
    <>
      <StepLabel>Add option</StepLabel>
      <StepContent>
        <Stack spacing={3}>
          <FormikRadioBtn
            options={options}
            name={typeField.name}
            label={typeField.label}
            defaultValue={options[0].value}
          />
          {haveManyOptions}
        </Stack>
      </StepContent>
    </>
  );
};

export default memo(AddOptionStep);
