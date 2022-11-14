import { render, screen } from "@testing-library/react";
import InputSearch from "./InputSearch";

const setup = () => render(<InputSearch />);

test("First Loading text", () => {
  setup();

  const firstLoadingText = screen.getByText(/Loading/i);
  expect(firstLoadingText).toBeInTheDocument();
});

test("Render the combo box", async () => {
  setup();

  const noBreedsSelectedText = await screen.findByText(/Don't be afraid/i);
  expect(noBreedsSelectedText).toBeInTheDocument();

  const inputFieldLabel = await screen.findByLabelText(/Breeds/i);
  expect(inputFieldLabel).toBeInTheDocument();
});
