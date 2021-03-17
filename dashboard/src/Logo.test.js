import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Logo from "./Logo";

test("handles no logo", () => {
  const onChange = jest.fn();
  render(<Logo onChange={onChange} storageRef={{}} />);

  expect(screen.getAllByRole("rowgroup")[1]).toBeEmptyDOMElement();
});

test("previews logo", async () => {
  const onChange = jest.fn();
  const promise = Promise.resolve("http://example.com");
  const storageRef = {
    child: jest.fn(() => ({
      getDownloadURL: () => promise,
    })),
  };
  render(
    <Logo
      onChange={onChange}
      storageRef={storageRef}
      value={{ name: "test.jpg", timestamp: 12345 }}
    />
  );
  await act(() => promise);

  userEvent.click(screen.getByText("View Preview"));

  screen.getByText("test.jpg");
  expect(screen.getByAltText("Preview")).toHaveAttribute(
    "src",
    "http://example.com"
  );
});

test("deletes logo", async () => {
  const promise = Promise.resolve();
  const onChange = jest.fn();
  const del = jest.fn(() => Promise.resolve());
  const storageRef = {
    child: jest.fn(() => ({
      getDownloadURL: () => promise,
      delete: del,
    })),
  };
  render(
    <Logo
      onChange={onChange}
      storageRef={storageRef}
      value={{ name: "test.jpg", timestamp: 12345 }}
    />
  );
  await act(() => promise);

  userEvent.click(screen.getByRole("button", { name: "Delete" }));

  expect(del).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith(null);
});

test("uploads logo", async () => {
  const promise = Promise.resolve();
  const onChange = jest.fn();
  const put = jest.fn(() => ({
    on: jest.fn((x, y, z, callback) => {
      callback();
    }),
  }));
  const storageRef = {
    child: jest.fn(() => ({
      getDownloadURL: () => promise,
      put,
    })),
  };
  render(<Logo onChange={onChange} storageRef={storageRef} />);
  await act(() => promise);

  const file = new File([], "hello.png", { type: "image/png" });
  userEvent.upload(screen.getByLabelText("Upload Image"), file);
  userEvent.click(screen.getByText("Upload"));

  expect(put).toHaveBeenCalledWith(file);
  expect(onChange.mock.calls[0][0].name).toEqual("hello.png");
});
