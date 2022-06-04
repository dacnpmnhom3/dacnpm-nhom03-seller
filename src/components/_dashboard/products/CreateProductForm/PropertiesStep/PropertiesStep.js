import React, { memo } from "react";
import {
  StepLabel,
  StepContent,
  Stack,
  TableContainer,
  Table,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import FormikTextField from "components/input/FormikTextField";

const PropertiesStep = () => {
  const { selectedCategory } = useSelector((state) => state.product);

  return (
    <>
      <StepLabel>Properties</StepLabel>
      <StepContent>
        <Stack spacing={3}>
          {selectedCategory.properties?.map((property) => (
            <TableContainer key={property._id} component={Paper}>
              <Typography variant="h6" component="div">
                {property.name}
              </Typography>
              <Table sx={{ minWidth: 650 }} aria-label="properties table">
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                  {property?.sub_properties?.map((subProp, index) => (
                    <TableRow
                      key={subProp}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell width="30%" component="th" scope="row">
                        {subProp}
                      </TableCell>
                      <TableCell align="right">
                        <FormikTextField
                          fullWidth
                          variant="standard"
                          name={`properties[${property._id}][${index}][${subProp}]`}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </Stack>
      </StepContent>
    </>
  );
};

export default memo(PropertiesStep);
