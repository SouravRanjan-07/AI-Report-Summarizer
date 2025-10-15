import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography } from '@mui/material';
import FileUploader from './components/FileUploader';
import ResultsPanel from './components/ResultsPanel';
import ThemeToggle from './components/ThemeToggle';

export default function App(){
  const [dark, setDark] = useState(true);
  const [result, setResult] = useState(null);
  const theme = createTheme({ palette: { mode: dark? 'dark':'light' } });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{py:4}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">AI Medical Report Simplifier</Typography>
          <ThemeToggle dark={dark} setDark={setDark} />
        </Box>
        <FileUploader setResult={setResult} />
        <Box mt={3}>
          <ResultsPanel result={result} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
