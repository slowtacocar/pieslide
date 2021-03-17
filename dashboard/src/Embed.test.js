import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Embed from "./Embed";

test("displays data", () => {
  const onChange = jest.fn();
  render(<Embed value={"http://example.com"} onChange={onChange} />);

  expect(screen.getByLabelText("Website Embed Link")).toHaveValue(
    "http://example.com"
  );
});

test("updates data", () => {
  const onChange = jest.fn();
  render(<Embed value={"http://example.com"} onChange={onChange} />);

  userEvent.type(screen.getByLabelText("Website Embed Link"), "f");

  expect(onChange).toHaveBeenLastCalledWith("http://example.comf");
});
