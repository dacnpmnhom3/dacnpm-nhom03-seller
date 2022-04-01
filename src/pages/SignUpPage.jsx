import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./SignUpPage.css";
import { Controller, useForm } from "react-hook-form";
function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Container sx={{ backgroundColor: "rgb(245, 245, 250)" }} maxWidth="xl">
      <Header />

      <Grid container>
        <Grid xl={6} lg={6} sm={12} xs={12}>
          <h1>
            Đăng ký bán hàng cùng{" "}
            <Link to="/">
              <img
                alt="Logo"
                className="tiki"
                src="https://salt.tikicdn.com/ts/user/ee/09/6b/27a9c9764d0dbfd497c582e48bdc9c98.png"
              />
            </Link>
          </h1>
          <p>
            Tiếp cận hơn <span className="blue">22 triệu lượt truy cập</span>{" "}
            mỗi tháng!
          </p>
          <img
            alt="Logo"
            className="signup-img"
            src="https://salt.tikicdn.com/cache/w680/ts/user/dc/e6/b4/fa5101071b365ee2f385fd7d208b309f.jpg"
          />
        </Grid>
        <Grid
          xl={6}
          lg={6}
          sm={12}
          xs={12}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>Đăng ký ngay</h1>
          {/* Email */}
          <div>
            <b>Địa chỉ Email</b>
          </div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            render={({ field }) => {
              const check = errors.email
                ? { helperText: "Please enter a valid email" }
                : null;
              return (
                <TextField
                  className="text-field"
                  required
                  error={!!errors.email}
                  variant="outlined"
                  placeholder="Input your email"
                  {...check}
                  fullWidth={true}
                  margin="dense"
                  {...field}
                />
              );
            }}
          />
          {/* HỌ và tên */}
          <div>
            <b>Họ và tên</b>
          </div>
          <Controller
            name="fullName"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => {
              const check = errors.fullName
                ? { helperText: "Please enter your full name" }
                : null;
              return (
                <TextField
                  className="text-field"
                  required
                  error={!!errors.fullName}
                  variant="outlined"
                  placeholder="Input your full name"
                  {...check}
                  fullWidth={true}
                  margin="dense"
                  {...field}
                />
              );
            }}
          />
          {/* Phone */}
          <div>
            <b>Phone</b>
          </div>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ required: true, pattern: /^[0-9]{10,11}$/ }}
            render={({ field }) => {
              const check = errors.phone
                ? { helperText: "Please enter a valid phone" }
                : null;
              return (
                <TextField
                  className="text-field"
                  required
                  error={!!errors.phone}
                  variant="outlined"
                  placeholder="Input your Phone"
                  {...check}
                  fullWidth={true}
                  margin="dense"
                  {...field}
                />
              );
            }}
          />
          {/* Password */}
          <div>
            <b>Mật khẩu</b>
          </div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true, minLength: 6 }}
            render={({ field }) => {
              const check = errors.password
                ? {
                    helperText: "Password must be at least 6 characters",
                    error: true,
                  }
                : null;
              return (
                <TextField
                  className="text-field"
                  required
                  error={!!errors.password}
                  variant="outlined"
                  placeholder="Input your password"
                  {...check}
                  fullWidth={true}
                  margin="dense"
                  type="password"
                  {...field}
                />
              );
            }}
          />
          {/* Confirm Password */}
          <div>
            <b>Xác nhận mật khẩu</b>
          </div>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{ required: true, minLength: 6 }}
            render={({ field }) => {
              const check =
                watch("password") !== watch("confirmPassword")
                  ? { helperText: "Password does not match." }
                  : null;

              return (
                <TextField
                  className="text-field"
                  required
                  error={watch("password") !== watch("confirmPassword")}
                  variant="outlined"
                  placeholder="Input your confirm password"
                  {...check}
                  fullWidth={true}
                  margin="dense"
                  type="password"
                  {...field}
                />
              );
            }}
          />

          {/* button đăng ký ngay */}
          <div className="signup-button">
            <Button
              className="button-register"
              variant="contained"
              type="submit"
              disabled={!isValid || isLoading}
              fullWidth={true}
            >
              {isLoading ? <CircularProgress /> : "Đăng ký ngay"}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUpPage;
