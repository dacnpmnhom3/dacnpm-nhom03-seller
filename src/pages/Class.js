import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "src/api/axiosClient";
import { setErrorMsg } from "src/redux/alert";

import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { Grid, Button, Container, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import ClassItem from "src/components/_dashboard/class/ClassItem";
import ClassSearch from "src/components/_dashboard/class/ClassSearch";
import ClassSort from "src/components/_dashboard/class/ClassSort";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------

export default function Class() {
  const [classes, setClasses] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");

  const dispatch = useDispatch();

  async function fetchAPI() {
    try {
      const res = await axiosClient.get("/api/admin/classes");
      setClasses([...res.data]);
    } catch (error) {
      if (error.response.data) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);

  const handleSortByDate = (event) => {
    const tempClasses = [...classes];
    tempClasses.sort((a, b) =>
      event.target.value === "oldest"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );
    setSortOrder(event.target.value);
    setClasses(tempClasses);
  };
  return (
    <Page title="Dashboard: Classes">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Classes
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Class
          </Button>
        </Stack>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ClassSearch classes={classes} />
          <ClassSort
            currentValue={sortOrder}
            options={SORT_OPTIONS}
            onSort={handleSortByDate}
          />
        </Stack>

        <Grid container spacing={3}>
          {classes.map((post, index) => (
            <Grid item key={post.id} lg={4} md={6} xs={12}>
              <ClassItem clss={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
