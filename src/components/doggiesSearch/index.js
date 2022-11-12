import React from "react";
import { Grid, Box } from "@mui/material";

import "./styles.css";
import PrincipalImage from "./PrincipalImage";
import InputSearch from "./InputSearch";

export default function DoggiesSearch() {
  return (
    <Grid container justifyContent="center" paddingTop={6}>
      <Grid item xs={12}>
        <PrincipalImage />
        <div className={"inputContainer"}>
          <InputSearch />
        </div>
      </Grid>
    </Grid>
  );
}
