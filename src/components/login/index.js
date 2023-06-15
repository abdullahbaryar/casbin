import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormStyle, boxheihgt, clr, forget, linkstyl, right } from "./style";
import { auto, login, manual } from "../../app/auth";
import CasbinDemo from "../CasbinDemo";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  console.log(user, "ggggggggggg");
  const [manualData, setmanual] = useState("");
  const [autoData, setmaAuto] = useState("");
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values) => {
    setLoading(true);
    login(values, setUser, setLoading);
    // formik.resetForm;
  };
  const formik = useFormik({
    onSubmit,
    initialValues,
  });
  useEffect(() => {
    if (user) {
      manual(setmanual);
      auto(setmaAuto);
    }
  }, [user]);
  console.log(manualData, "manualData---------------");

  return (
    <Box>
      <Box sx={right}>
        <Box sx={FormStyle}>
          <form onSubmit={formik.handleSubmit}>
            {/* Email input field */}
            <Box sx={boxheihgt}>
              <Typography variant="labelText">Email</Typography>
              <TextField
                placeholder="Email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                {...formik.getFieldProps("email")}
              />
            </Box>
            {/* Password input field */}

            <Box sx={forget}>
              <Typography variant="labelText">Password</Typography>
            </Box>
            <TextField
              placeholder="Password "
              variant="outlined"
              fullWidth
              id="outlined-basic"
              name="password"
              type="password"
              {...formik.getFieldProps("password")}
            />

            <Button
              type="submit"
              disabled={loading ? true : false}
              variant="contained"
              sx={{ mt: "10px" }}
            >
              {!loading ? " Login" : <CircularProgress size="1.7rem" />}
            </Button>
          </form>
        </Box>
        {user && user?.roles && (
          <CasbinDemo manualData={manualData} autoData={autoData}  />
        )}
      </Box>
    </Box>
  );
};

export default Login;
