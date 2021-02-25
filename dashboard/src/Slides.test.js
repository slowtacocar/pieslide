import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Slides from "./Slides";

test("displays data", async () => {
  const promise = Promise.resolve();
  const onChange = jest.fn();
  const storageRef = {
    child: jest.fn(() => ({
      getDownloadURL: () => promise,
    })),
  };
  render(
    <Slides
      onChange={onChange}
      storageRef={storageRef}
      duration={5}
      slides={[{ name: "test.jpg", timestamp: 12345, duration: 6 }]}
    />
  );
  await act(() => promise);

  screen.getByText("test.jpg");
  expect(screen.getByRole("spinbutton")).toHaveValue(6);
});

test("changes duration", async () => {
  const promise = Promise.resolve();
  const onChange = jest.fn();
  const storageRef = {
    child: jest.fn(() => ({
      getDownloadURL: () => promise,
    })),
  };
  render(
    <Slides
      onChange={onChange}
      storageRef={storageRef}
      duration={5}
      slides={[{ name: "test.jpg", timestamp: 12345, duration: 6 }]}
    />
  );
  await act(() => promise);

  userEvent.type(screen.getByRole("spinbutton"), "0");

  expect(onChange).toHaveBeenCalledWith([
    { name: "test.jpg", timestamp: 12345, duration: 60 },
  ]);
});

test("previews slide", async () => {
  const promise = Promise.resolve("http://example.com");
  const onChange = jest.fn();
  const storageRef = {
    child: jest.fn(() => ({
      getDownloadURL: () => promise,
    })),
  };
  render(
    <Slides
      onChange={onChange}
      storageRef={storageRef}
      duration={5}
      slides={[{ name: "test.jpg", timestamp: 12345, duration: 6 }]}
    />
  );
  await act(() => promise);

  userEvent.click(screen.getByText("View Preview"));

  expect(screen.getByAltText("Preview")).toHaveAttribute(
    "src",
    "http://example.com"
  );
});

test("deletes slide", async () => {
  const promise = Promise.resolve();
  const onChange = jest.fn();
  const del = jest.fn();
  const storageRef = {
    child: jest.fn(() => ({
      getDownloadURL: () => promise,
      delete: del,
    })),
  };
  render(
    <Slides
      onChange={onChange}
      storageRef={storageRef}
      duration={5}
      slides={[
        { name: "test.jpg", timestamp: 12345, duration: 6 },
        { name: "test2.jpg", timestamp: 6789, duration: 6 },
      ]}
    />
  );
  await act(() => promise);

  userEvent.click(screen.getAllByRole("button", { name: "Delete" })[0]);

  expect(del).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith([
    { name: "test2.jpg", timestamp: 6789, duration: 6 },
  ]);
});

test("uploads slide", async () => {
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
  render(
    <Slides
      onChange={onChange}
      storageRef={storageRef}
      duration={5}
      slides={[{ name: "test.jpg", timestamp: 12345, duration: 6 }]}
    />
  );
  await act(() => promise);

  const file = new File([], "hello.png", { type: "image/png" });
  userEvent.upload(screen.getByLabelText("Upload Image"), file);
  userEvent.click(screen.getByText("Upload"));

  expect(put).toHaveBeenCalledWith(file);
  expect(onChange).toHaveBeenCalledWith([
    { name: "test.jpg", timestamp: 12345, duration: 6 },
    { name: "hello.png", timestamp: expect.anything(), duration: 5 },
  ]);
});
