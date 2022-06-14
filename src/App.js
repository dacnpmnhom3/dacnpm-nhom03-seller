// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import ErrorSnackbar from "./components/ErrorSnackbar";
import SuccessSnackbar from "./components/SuccessSnackbar";

// ----------------------------------------------------------------------
export default function App() {
  return (
    <ThemeConfig>
      <ErrorSnackbar />
      <SuccessSnackbar />
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
