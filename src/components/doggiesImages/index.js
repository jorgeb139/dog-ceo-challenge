import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";

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
        <div>Loading images...</div>
      ) : (
        <Grid container justifyContent="center" paddingTop={6}>
          {doggiesImages?.map((element, id) => (
            <div key={id}>
              <span>{element.breed}</span>
              {element.images?.map((image, id) => (
                <Grid key={id} item md={4} xs={12}>
                  <img src={image} alt="Doggies"></img>
                </Grid>
              ))}
            </div>
          ))}
        </Grid>
      )}
    </>
  );
}
