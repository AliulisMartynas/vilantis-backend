import "./App.css";

import { Route, HashRouter as Router } from "react-router-dom";

import AdministratorPage from "./pages/AdministratorPage";
import { Grid } from "@mui/material";
import MainPage from "./pages/MainPage";
import UrlNotActivePage from "./pages/UrlNotActivePage";

const App = () => {
  return (
    <Grid container justifyContent="center" sx={{ mt: 10 }}>
      <div className="App">
        <Router>
          <Route path="/" exact component={MainPage} />
          <Route path="/administrator/" exact component={AdministratorPage} />
          <Route path="/url-not-active/" exact component={UrlNotActivePage} />
        </Router>
      </div>
    </Grid>
  );
};

export default App;
