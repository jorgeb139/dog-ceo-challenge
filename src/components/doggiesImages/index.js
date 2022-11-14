import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";

import "./styles.css";
import { getImages } from "../../utils/getImages";

export default function DoggiesImages(data) {
  const [doggiesImages, setDoggiesImages] = useState([]);

  const nameBreed = data.breed[0].split(" ");
  const difference = data.difference;

  useEffect(() => {
    if (difference !== undefined && nameBreed !== undefined) {
      setDoggiesImages(
        doggiesImages.filter((element) => !element.breed.includes(difference))
      );
    } else {
      getImages(setDoggiesImages, nameBreed, doggiesImages);
    }
  }, [data]);

  return (
    <>
      {doggiesImages.length === 0 ? (
        <Grid item xs={12}>
          Loading images...
        </Grid>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            justifyContent="center"
            paddingTop={6}
            className="container"
          >
            {doggiesImages?.map((element, id) => (
              <div key={id} className="breed-container">
                <span className="breed-title">
                  {element.breed.charAt(0).toUpperCase() +
                    element.breed.slice(1)}
                </span>
                <Grid
                  item
                  container
                  xs={12}
                  spacing={2}
                  className="breed-images-container"
                >
                  {element.images?.map((image, id) => (
                    <Grid key={id} item md={4} xs={12}>
                      <img
                        src={image}
                        alt="Doggies"
                        className="doggies-images"
                      ></img>
                    </Grid>
                  ))}
                </Grid>
              </div>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
