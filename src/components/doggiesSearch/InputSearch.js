import React, { useState, useEffect } from "react";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";

import { getDoggies } from "../../utils/getDoggies";
import DoggiesImages from "../doggiesImages";

export default function InputSearch() {
  const [doggies, setDoggies] = useState([]); // First doggies load
  const [doggiesBreed, setDoggiesBreed] = useState([]); // Doggies Breeds
  const [doggiesBreedBackup, setDoggiesBreedBackup] = useState([]); // Array to compare deleted items on doggiesBreed
  const [subDoggies, setSubDoggies] = useState([]); // Doggies Sub breeds
  const [doggiesSubBreedBackup, setDoggiesSubBreedBackup] = useState([]); // Array to compare deleted items on doggiesBreed
  const [value, setValue] = useState([]); // Breeds selected
  const [subValue, setSubValue] = useState([]); // Sub breeds selected
  const [lastBreed, setLastBreed] = useState(""); // Last breed or sub breed selected, needed to obtain images
  const [differenceValue, setDifferenceValue] = useState(""); // Get element to delete

  // Obtain all dogs including sub breeds
  useEffect(() => {
    getDoggies(setDoggies, "breeds");
  }, []);

  // Obtain only dogs breeds
  useEffect(() => {
    const keys = Object.keys(doggies);
    if (keys.length > 0) {
      setDoggiesBreed(keys);
    }
  }, [doggies]);

  const handleOnChange = (setter, value, type) => {
    setter(value);
    setLastBreed(value.slice(-1));

    if (type === "breed") {
      if (doggiesBreed.length > 0 && value.length > 0) {
        getDoggies(setSubDoggies, "subBreeds", value.slice(-1));
      }

      if (!subDoggies.length > 0 || !value.length > 0) {
        setSubDoggies([]);
        setSubValue([]);
      }

      // Obtain the breed deleted and remove their corresponding sub breeds if apply
      // If there one breed removed, we can get it
      let difference = doggiesBreedBackup.filter(
        (element) => !value.includes(element)
      );

      // Setting breeds without removed breed
      setSubValue(() =>
        subValue.filter((element) => !element.includes(difference[0]))
      );

      setDifferenceValue(difference[0]);
      setDoggiesBreedBackup(value);
    } else {
      // Obtain the breed deleted and remove their corresponding sub breeds if apply, he array is already been updated, only need the difference value
      // If there one breed removed, we can get it
      let difference = doggiesSubBreedBackup.filter(
        (element) => !value.includes(element)
      );
      setDifferenceValue(difference[0]);
      setDoggiesSubBreedBackup(value);
    }
  };

  return (
    <>
      {doggiesBreed.length === 0 ? (
        <Grid item xs={12}>
          Loading...
        </Grid>
      ) : (
        <Box sx={{ flexGrow: 1 }} className={"box-container fadeInLeft"}>
          <Grid container item xs={12} justifyContent="center">
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
              className="breed-input"
            />
            <Grid item xs={12} sx={{ paddingTop: "20px" }}>
              {subDoggies.length === 0 && subValue.length === 0 ? (
                <></>
              ) : (
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container item xs={12} justifyContent="center">
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
                      className="breed-input"
                      sx={{ width: "70%", maxWidth: "400px" }}
                    />
                  </Grid>
                </Box>
              )}
            </Grid>
            {lastBreed.length === 0 && value.length === 0 ? (
              <Grid item xs={12} className="images-container">
                <span className="afraid-text">
                  Don't be afraid, select a breed. They won't bite you!!
                </span>
              </Grid>
            ) : (
              <Grid item xs={12} className="images-container">
                <DoggiesImages
                  breed={lastBreed.length > 0 ? lastBreed : value}
                  difference={differenceValue}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
}
