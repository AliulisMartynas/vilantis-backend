import { Box, Button, TextField, Typography } from "@mui/material";

import React from "react";
import { useState } from "react";

const MainPage = () => {
  const [url, setUrl] = useState();
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleChange = (value) => {
    setUrl((url) => ({ ...url, body: value }));
  };

  const submitLink = async () => {
    const shortenedLink = await fetch(`/api/urls/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    });

    const data = await shortenedLink.json();
    setShortenedUrl(data.shortened_value);
  };

  return (
    <div>
      <Box component="form" noValidate autoComplete="off">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Enter the URL you want to shorten
        </Typography>
        <TextField
          id="outlined-basic"
          label="Enter URL here"
          variant="outlined"
          value={url?.body}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          sx={{ mb: 2 }}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={submitLink}>
        Submit
      </Button>
      {shortenedUrl && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Shortened url:
          </Typography>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </Box>
      )}
    </div>
  );
};

export default MainPage;
