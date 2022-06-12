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

export default function ProductSummary({ productDetail }) {
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
            src={productDetail.img}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {productDetail.title}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {productDetail.category}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
}
