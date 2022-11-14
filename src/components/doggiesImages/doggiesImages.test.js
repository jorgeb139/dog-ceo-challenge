import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import DoggiesImages from "./index";

test("renders content", () => {
  const data = {
    breed: "terrier",
    difference: "undefined",
  };

  const view = render(
    <DoggiesImages breed={data.breed} difference={data.difference} />
  );

  // console.log(view);
});
