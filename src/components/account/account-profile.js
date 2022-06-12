import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export default function AccountProfile({ userDetail, image }) {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={image}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {userDetail.fullName}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {userDetail.address}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            GMT+0700
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
