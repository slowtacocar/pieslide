import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Panes from "./Panes";

test("displays tabs", () => {
  const onChange = jest.fn();
  render(
    <Panes
      panes={[
        {
          rowStart: 1,
          rowEnd: 2,
          columnStart: 1,
          columnEnd: 2,
          embed: "http://example.com",
          timestamp: 123,
        },
        {
          rowStart: 1,
          rowEnd: 2,
          columnStart: 2,
          columnEnd: 3,
          embed: "http://example2.com",
          timestamp: 456,
        },
      ]}
      duration={5}
      storageRef={{}}
      onChange={onChange}
    />
  );

  expect(screen.getAllByRole("tab").length).toBe(2);
  screen.getByText("Pane 1");
  screen.getByText("Pane 2");
});

test("opens edit panes", () => {
  const onChange = jest.fn();
  render(<Panes panes={[]} duration={5} storageRef={{}} onChange={onChange} />);

  userEvent.click(screen.getByText("Edit Panes"));

  screen.getByRole("heading", { name: "Edit Panes" });
});
