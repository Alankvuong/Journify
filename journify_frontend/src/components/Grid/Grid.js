import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "/Users/ryanung/Journify/journify_frontend/src/components/Cards/Card.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function NestedGrid() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Grid
        container
        spacing={6}
        rowSpacing={6}
        columns={3}
        marginTop={2}
        marginBottom={2}
      >
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={6}
        rowSpacing={6}
        columns={3}
        marginTop={2}
        marginBottom={2}
      >
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={6}
        rowSpacing={6}
        columns={3}
        marginTop={2}
        marginBottom={2}
      >
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>

        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={6}
        rowSpacing={6}
        columns={3}
        marginTop={2}
        marginBottom={2}
      >
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
        <Grid xs="auto" justifyContent="center" alignItems="center">
          <Card />
        </Grid>
      </Grid>
    </Box>
  );
}
