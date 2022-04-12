import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDocumentTitle } from "../hooks/custom";
import axiosClient from "api/axiosClient";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "redux/user";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a href="https://mui.com/getting-started/templates/">Your Website</a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email address is invalid")
    .required("Email address is required"),
  password: yup.string().required("Password is required"),
});

export default function SignIn() {
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  useDocumentTitle("Login Page");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = React.useCallback(
    async (data) => {
      console.log(data);

      try {
        setIsLoading(true);
        const res = await axiosClient.post("api/seller/login", data);

        if (res.status === 200) {
          dispatch(setIsAuthenticated(res.data.token));
          navigate("/", { replace: true });
          setIsLoading(false);
          setError("");
        }
      } catch (error) {
        console.log(error);
        setError(error?.message);
        setIsLoading(false);
      }
    },
    [dispatch, navigate]
  );

  const handleClickShowPassword = React.useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <Typography variant="body1" color={"error"} textAlign="left" mt={3}>
              {error}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl
              variant="outlined"
              fullWidth
              sx={{ mt: 5 }}
              error={errors.email ? true : false}
            >
              <InputLabel htmlFor="email">Email address</InputLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    id="email"
                    label="Email address"
                    autoComplete="email"
                    autoFocus
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <FormHelperText>{errors.email?.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              variant="outlined"
              fullWidth
              sx={{ mt: 3 }}
              error={errors.password ? true : false}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                )}
              />
              {errors.password && (
                <FormHelperText>{errors.password?.message}</FormHelperText>
              )}
            </FormControl>

            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  control={<Checkbox defaultChecked={false} />}
                  label="Remember me"
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress /> : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forget-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
