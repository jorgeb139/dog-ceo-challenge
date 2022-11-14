import React from "react";
import { Grid, Box } from "@mui/material";

import "./styles.css";
import InputSearch from "./InputSearch";

export default function DoggiesSearch() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent="center" paddingTop={6}>
        <Grid className="hero-container fadeInLeft" item xs={12}>
          <h2 className="pre-title fadeInLeft">Discover the most beautiful</h2>
          <h1 className="main-title fadeInLeft">Doggies</h1>
          <img
            className="hero-image fadeInLeft"
            src="/images/hero-doggie.png"
            alt="hero doggie"
          />
        </Grid>
        <Grid item xs={12} className={"input-container"}>
          <InputSearch />
        </Grid>
      </Grid>
    </Box>
  );
}
