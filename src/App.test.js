import { render, screen } from "@testing-library/react";
import App from "./App";

test("Render Hero", () => {
  render(<App />);
  const title = screen.getByText(/Discover the most beautiful/i);
  expect(title).toBeInTheDocument();

  const altImage = screen.getByAltText(/hero doggie/i);
  expect(altImage).toBeInTheDocument();
});
