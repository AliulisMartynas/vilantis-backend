import React from "react";
import { Typography } from "@mui/material";

const UrlNotActivePage = () => {
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        The shortened URL you tried to access is no longer active.
      </Typography>
      <Typography sx={{ mb: 3 }}>
        To activate it, visit the administrator page.
      </Typography>
      <a href="http://127.0.0.1:8000/#/administrator">
        <Typography>Go to administrator page</Typography>
      </a>
      <a href="http://127.0.0.1:8000/#/">
        <Typography>Go to main page</Typography>
      </a>
    </div>
  );
};

export default UrlNotActivePage;
