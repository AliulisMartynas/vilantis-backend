import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const AdministratorPage = () => {
  const [urls, setUrls] = useState([]);

  const getUrls = async () => {
    const fetchedUrls = await fetch("/api/urls/");
    const data = await fetchedUrls.json();
    setUrls(data);
  };

  useEffect(() => {
    getUrls();
  }, []);

  const changeLinkStatus = async (id) => {
    let url = urls.find((url) => url.id === id);
    url.active = !url.active;

    await fetch(`/api/urls/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    });

    await getUrls();
  };

  const deleteLink = async (id) => {
    await fetch(`/api/urls/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    await getUrls();
  };

  const updateNumberOfClicks = async (id) => {
    let url = urls.find((url) => url.id === id);
    let urlIndex = urls.findIndex((url) => url.id === id);

    if (url.number_of_clicks !== 5 && url.active) {
      url.number_of_clicks = url.number_of_clicks + 1;
    }

    if (url.number_of_clicks === 5) {
      url.active = false;
    }

    let newArr = [...urls];
    newArr[urlIndex] = url;
    setUrls(newArr);
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Shortened urls list:
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Shortened URL</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Number of clicks</TableCell>
              <TableCell>Change status</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell component="th" scope="row">
                  <a href={url.value} target="_blank" rel="noopener noreferrer">
                    {url.value}
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={url.shortened_value}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => updateNumberOfClicks(url.id)}
                  >
                    {url.shortened_value}
                  </a>
                </TableCell>
                <TableCell>{url.active ? "Active" : "Not active"}</TableCell>
                <TableCell>{url.number_of_clicks}</TableCell>
                <TableCell>
                  {url.active ? (
                    <Tooltip title="Deactivate link">
                      <IconButton onClick={() => changeLinkStatus(url.id)}>
                        <BlockIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Activate link">
                      <IconButton onClick={() => changeLinkStatus(url.id)}>
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete link">
                    <IconButton onClick={() => deleteLink(url.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdministratorPage;
