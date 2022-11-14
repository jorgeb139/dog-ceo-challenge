import { render, screen } from "@testing-library/react";
import axios from "axios";
import DoggiesImages from "../doggiesImages";

jest.mock("axios");
const setup = () => {
  axios.get.mockClear();
};

test("Load doggies breeds images", async () => {
  setup();

  const data = {
    breed: "hound",
    difference: undefined,
  };

  const view = render(<DoggiesImages breed="hound" difference="undefined" />);

  axios.get.mockReturnValueOnce({
    data: {
      message: [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_4517.jpg",
        "https://images.dog.ceo/breeds/hound-blood/n02088466_10724.jpg",
        "https://images.dog.ceo/breeds/hound-walker/n02089867_126.jpg",
      ],
      status: "success",
    },
  });

  const initialLoadingText = screen.getByText(/Loading images.../i);
  expect(initialLoadingText).toBeInTheDocument();

  // const images = await screen.findByAltText(/Doggies/i);
  // expect(images).toBeInTheDocument();

  // const initialLoadingTextExpected = screen.queryByText(/Loading images.../i);
  // expect(initialLoadingTextExpected).not.toBeInTheDocument();
});
