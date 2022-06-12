import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------
export default function ClassItem({ clss }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
      }}
      underline="hover"
      component={RouterLink}
      to={`./${clss.id}`}
    >
      <CardContent>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {clss.className}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {clss.classSection}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Icon
              icon="healthicons:i-schedule-school-date-time"
              width={20}
              height={20}
            />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {new Date(clss.createdAt).toLocaleString()}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Icon
              icon="fluent:people-community-20-filled"
              width={20}
              height={20}
            />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {clss.total_members} Members
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
