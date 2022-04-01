import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignIn from "./pages/SignInPage";

function App() {
  const theme = createTheme({
    palette: {
      // primary: {
      //   light: "#4fb3bf",
      //   main: "#00838f",
      //   dark: "#005662",
      //   contrastText: "#fff",
      // },
      // secondary: {
      //   light: "#819ca9",
      //   main: "#546e7a",
      //   dark: "#29434e",
      //   contrastText: "#fff",
      // },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
