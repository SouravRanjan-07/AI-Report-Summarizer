import React, { useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import axios from "axios";

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [normalized, setNormalized] = useState(null);

  const handleFile = (e) => setFile(e.target.files[0]);

  const uploadAndProcess = async () => {
    if (!file) return alert("Please select a file first.");

    setUploading(true);
    setProgress(0);
    try {
      const data = new FormData();
      data.append("file", file);

      const resp = await axios.post("http://localhost:8000/process", data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) => {
          if (p.total) setProgress(Math.round((p.loaded * 100) / p.total));
        },
      });

      const normalized =
        typeof resp.data.normalized === "string"
          ? JSON.parse(resp.data.normalized)
          : resp.data.normalized;

      setNormalized(normalized);
    } catch (err) {
      console.error(err);
      alert("Failed to process file. Check console for details.");
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 400);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6">Upload a medical report</Typography>
      <Box mt={2} display="flex" gap={2} alignItems="center">
        <input type="file" onChange={handleFile} />
        <Button variant="contained" onClick={uploadAndProcess}>
          Upload & Process
        </Button>
      </Box>
      {uploading && (
        <Box mt={2}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}

      {normalized && (
        <Box mt={4}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            🩺 {normalized.test_name || "Medical Report Summary"}
          </Typography>
          <Divider sx={{ my: 2 }} />

          {normalized.patient_info && (
            <Box mb={2}>
              <Typography>
                <strong>Name:</strong> {normalized.patient_info.name}
              </Typography>
              <Typography>
                <strong>Age:</strong> {normalized.patient_info.age}
              </Typography>
              <Typography>
                <strong>Sex:</strong> {normalized.patient_info.sex}
              </Typography>
            </Box>
          )}

          {/* Summary sentence */}
          {normalized.summary && (
            <Typography sx={{ mb: 2, fontStyle: "italic" }}>
              {normalized.summary}
            </Typography>
          )}

          {/* Test Table */}
          {normalized.parameters && (
            <Table size="small" sx={{ border: "1px solid #ddd", mb: 3 }}>
              <TableHead sx={{ backgroundColor: "#f5f7ff" }}>
                <TableRow>
                  <TableCell><strong>Test</strong></TableCell>
                  <TableCell><strong>Value</strong></TableCell>
                  <TableCell><strong>Normal Range</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {normalized.parameters.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.value}</TableCell>
                    <TableCell>{p.normal_range}</TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color:
                          p.status === "High"
                            ? "red"
                            : p.status === "Low"
                            ? "orange"
                            : "green",
                      }}
                    >
                      {p.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Advice Section */}
          {normalized.advice && (
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Doctor’s Advice:
              </Typography>
              <Typography sx={{ whiteSpace: "pre-wrap" }}>
                {normalized.advice}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
}
