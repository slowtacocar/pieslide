import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Preview from "./Preview";

test("closes", () => {
  const onClose = jest.fn();
  render(<Preview onClose={onClose} shown />);

  userEvent.click(screen.getByText("Close"));

  expect(onClose).toHaveBeenCalled();
});
