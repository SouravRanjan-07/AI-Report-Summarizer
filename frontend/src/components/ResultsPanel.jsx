import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';

export default function ResultsPanel({ result }){
  if(!result) return null;
  return (
    <Paper sx={{p:2}}>
      <Typography variant="h6">Summary</Typography>
      <Typography>{result.summary}</Typography>
      <Box mt={2}>
        <Typography variant="subtitle1">Tests</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell><TableCell>Value</TableCell><TableCell>Unit</TableCell><TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.tests?.map((t,i)=>(
              <TableRow key={i}>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.value}</TableCell>
                <TableCell>{t.unit}</TableCell>
                <TableCell>{t.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}
