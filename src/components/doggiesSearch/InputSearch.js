import React, { useState, useEffect } from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";

import { getDoggies } from "../../utils/getDoggies";

export default function InputSearch() {
  const [doggies, setDoggies] = useState([]); // First doggies load
  const [doggiesBreed, setDoggiesBreed] = useState([]); // Doggies Breeds
  const [doggiesBreedBackup, setDoggiesBreedBackup] = useState([]); // Array to compare deleted items on doggiesBreed
  const [subDoggies, setSubDoggies] = useState([]); // Doggies Sub breeds
  const [value, setValue] = useState([]); // Breeds selected
  const [subValue, setSubValue] = useState([]); // Sub breeds selected

  useEffect(() => {
    getDoggies(setDoggies, "breeds");
  }, []);

  useEffect(() => {
    const keys = Object.keys(doggies);
    if (keys.length > 0) {
      setDoggiesBreed(keys);
    }
  }, [doggies]);

  useEffect(() => {
    if (doggiesBreed.length > 0 && value.length > 0) {
      getDoggies(setSubDoggies, "subBreeds", value.slice(-1));
    }
    if (!subDoggies.length > 0 || !value.length > 0) {
      setSubDoggies([]);
      setSubValue([]);
    }
  }, [value]);

  const handleOnChange = (setter, value, type) => {
    setter(value);

    if (type === "breed") {
      let difference = doggiesBreedBackup.filter((x) => !value.includes(x));
      let breedRemoved = doggiesBreedBackup.filter(
        (element) => element === difference[0]
      );

      setSubValue(() =>
        subValue.filter((element) => !element.includes(breedRemoved[0]))
      );
      setDoggiesBreedBackup(value);
    }
  };

  return (
    <>
      {doggiesBreed.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <Grid container>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              handleOnChange(setValue, newValue, "breed");
            }}
            multiple
            limitTags={4}
            id="multiple-limit-tags"
            options={doggiesBreed}
            getOptionLabel={(option) =>
              option.charAt(0).toUpperCase() + option.slice(1)
            }
            defaultValue={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Breeds"
                placeholder="Doggies Breeds"
              />
            )}
            sx={{ width: "500px" }}
          />
          <div>
            {subDoggies.length === 0 && subValue.length === 0 ? (
              <div>Without sub breeds</div>
            ) : (
              <>
                <Autocomplete
                  value={subValue}
                  onChange={(event, newValue) => {
                    handleOnChange(setSubValue, newValue, "subBreed");
                  }}
                  freeSolo
                  multiple
                  limitTags={4}
                  id="multiple-limit-tags"
                  options={subDoggies}
                  getOptionLabel={(option) =>
                    option.charAt(0).toUpperCase() + option.slice(1)
                  }
                  defaultValue={[]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sub Breeds"
                      placeholder="Doggies Sub Breeds"
                    />
                  )}
                  sx={{ width: "500px" }}
                />
              </>
            )}
          </div>
        </Grid>
      )}
    </>
  );
}
