
// material
import { MenuItem, TextField } from "@mui/material";

// ----------------------------------------------------------------------

export default function ClassSort({ currentValue, options, onSort }) {
  return (
    <TextField select size="small" value={currentValue} onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
