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

const AddOptionStep = ({ typeField }) => {
  return (
    <>
      <StepLabel>Add option</StepLabel>
      <StepContent>
        <Stack spacing={3}>
          <FormikRadioBtn
            options={options}
            label={typeField.label}
            name={typeField.name}
            defaultValue={options[0].value}
          />
        </Stack>
      </StepContent>
    </>
  );
};

export default memo(AddOptionStep);
