import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditPanes from "./EditPanes";

test("displays data", () => {
  const onChange = jest.fn();
  const onClose = jest.fn();
  render(
    <EditPanes
      shown
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
          slides: [],
          timestamp: 456,
        },
      ]}
      onChange={onChange}
      onClose={onClose}
    />
  );

  expect(screen.getAllByRole("row").length).toBe(3);
  expect(screen.getAllByRole("row")[1]).toContainElement(
    screen.getByText("Website Embed")
  );
  expect(screen.getAllByRole("row")[1]).toContainElement(
    screen.getByRole("rowheader", { name: "Pane 1" })
  );
  expect(screen.getAllByRole("row")[2]).toContainElement(
    screen.getByText("Slideshow")
  );
  expect(screen.getAllByRole("row")[2]).toContainElement(
    screen.getByRole("rowheader", { name: "Pane 2" })
  );
});

test("can be closed", () => {
  const onChange = jest.fn();
  const onClose = jest.fn();
  render(
    <EditPanes shown={false} panes={[]} onChange={onChange} onClose={onClose} />
  );

  expect(screen.queryByText("Edit Panes")).not.toBeInTheDocument();
});

test("closes with button", () => {
  const onChange = jest.fn();
  const onClose = jest.fn();
  render(<EditPanes shown panes={[]} onChange={onChange} onClose={onClose} />);

  userEvent.click(screen.getByText("Close"));

  expect(onClose).toHaveBeenCalled();
});

test("can add new slideshow", () => {
  const onChange = jest.fn();
  const onClose = jest.fn();
  render(
    <EditPanes
      shown
      panes={[
        {
          rowStart: 1,
          rowEnd: 2,
          columnStart: 1,
          columnEnd: 2,
          embed: "http://example.com",
          timestamp: 123,
        },
      ]}
      onChange={onChange}
      onClose={onClose}
    />
  );

  userEvent.click(screen.getByText("New Slideshow Pane"));

  expect(onChange).toHaveBeenCalledWith([
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
      columnStart: 1,
      columnEnd: 2,
      slides: [],
      timestamp: expect.anything(),
    },
  ]);
});

test("can add new website embed", () => {
  const onChange = jest.fn();
  const onClose = jest.fn();
  render(
    <EditPanes
      shown
      panes={[
        {
          rowStart: 1,
          rowEnd: 2,
          columnStart: 1,
          columnEnd: 2,
          embed: "http://example.com",
          timestamp: 123,
        },
      ]}
      onChange={onChange}
      onClose={onClose}
    />
  );

  userEvent.click(screen.getByText("New Website Embed Pane"));

  expect(onChange).toHaveBeenCalledWith([
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
      columnStart: 1,
      columnEnd: 2,
      embed: "",
      timestamp: expect.anything(),
    },
  ]);
});

test("can delete pane", () => {
  const onChange = jest.fn();
  const onClose = jest.fn();
  render(
    <EditPanes
      shown
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
          slides: [],
          timestamp: 456,
        },
      ]}
      onChange={onChange}
      onClose={onClose}
    />
  );

  userEvent.click(screen.getAllByRole("button", { name: "Delete" })[0]);

  expect(onChange).toHaveBeenCalledWith([
    {
      rowStart: 1,
      rowEnd: 2,
      columnStart: 2,
      columnEnd: 3,
      slides: [],
      timestamp: 456,
    },
  ]);
});

test("can change layout", () => {
  const onChange = jest.fn();
  const onClose = jest.fn();
  render(
    <EditPanes
      shown
      panes={[
        {
          rowStart: 1,
          rowEnd: 2,
          columnStart: 1,
          columnEnd: 2,
          embed: "http://example.com",
          timestamp: 123,
        },
      ]}
      onChange={onChange}
      onClose={onClose}
    />
  );

  userEvent.type(screen.getAllByRole("spinbutton")[0], "0");

  expect(onChange).toHaveBeenCalledWith([
    {
      rowStart: 1,
      rowEnd: 2,
      columnStart: 10,
      columnEnd: 2,
      embed: "http://example.com",
      timestamp: 123,
    },
  ]);

  userEvent.type(screen.getAllByRole("spinbutton")[1], "1");

  expect(onChange).toHaveBeenCalledWith([
    {
      rowStart: 1,
      rowEnd: 2,
      columnStart: 1,
      columnEnd: 21,
      embed: "http://example.com",
      timestamp: 123,
    },
  ]);

  userEvent.type(screen.getAllByRole("spinbutton")[2], "2");

  expect(onChange).toHaveBeenCalledWith([
    {
      rowStart: 12,
      rowEnd: 2,
      columnStart: 1,
      columnEnd: 2,
      embed: "http://example.com",
      timestamp: 123,
    },
  ]);

  userEvent.type(screen.getAllByRole("spinbutton")[3], "3");

  expect(onChange).toHaveBeenCalledWith([
    {
      rowStart: 1,
      rowEnd: 23,
      columnStart: 1,
      columnEnd: 2,
      embed: "http://example.com",
      timestamp: 123,
    },
  ]);
});
