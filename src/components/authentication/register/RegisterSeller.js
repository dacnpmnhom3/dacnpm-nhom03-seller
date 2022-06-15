import {
  Stack, TextField, Button, CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axiosClient from "api/axiosClient";
import { setErrorMsg, setSuccessMsg } from "redux/alert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../../hooks/custom";

function RegisterSeller() {
  useDocumentTitle("Sign Up Page");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "all" });

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      await axiosClient.post("/api/seller/register", data);
      dispatch(setSuccessMsg("Register Successfully!"));
      navigate("/login", { replace: true });
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <Stack spacing={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true,
pattern: /^\S+@\S+$/i }}
          render={({ field }) => {
            const check = errors.email
              ? { helperText: "Please enter a valid email" }
              : null;
            return (
              <TextField
                required
                error={!!errors.email}
                label="Email"
                {...check}
                margin="dense"
                fullWidth
                {...field}
              />
            );
          }}
        />
        {/* HỌ và tên */}
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
                required
                error={!!errors.fullName}
                label="Full name"
                {...check}
                fullWidth
                margin="dense"
                {...field}
              />
            );
          }}
        />
        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{ required: true,
pattern: /^[0-9]{10,11}$/ }}
          render={({ field }) => {
            const check = errors.phone
              ? { helperText: "Please enter a valid phone" }
              : null;
            return (
              <TextField
                required
                error={!!errors.phone}
                label="Phone"
                {...check}
                fullWidth
                margin="dense"
                {...field}
              />
            );
          }}
        />
        {/* Password */}
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true,
minLength: 6 }}
          render={({ field }) => {
            const check = errors.password
              ? {
                helperText: "Password must be at least 6 characters",
                error: true,
              }
              : null;
            return (
              <TextField
                required
                error={!!errors.password}
                label="Password"
                {...check}
                fullWidth
                type="password"
                margin="dense"
                {...field}
              />
            );
          }}
        />
        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{ required: true,
minLength: 6 }}
          render={({ field }) => {
            const check = watch("password") !== watch("confirmPassword")
              ? { helperText: "Password does not match." }
              : null;

            return (
              <TextField
                required
                error={watch("password") !== watch("confirmPassword")}
                label="Confirm password"
                {...check}
                fullWidth
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
            variant="contained"
            type="submit"
            disabled={!isValid || isLoading}
            fullWidth
            size="large"
          >
            {isLoading ? <CircularProgress /> : "Register now"}
          </Button>
        </div>
      </form>
    </Stack>
  );
}

export default RegisterSeller;
