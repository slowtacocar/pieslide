import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Settings from "./Settings";

test("displays data", () => {
  const onDurationChange = jest.fn();
  const onNewsChange = jest.fn();
  const onSizeChange = jest.fn();
  const onTimeChange = jest.fn();
  const onTransitionChange = jest.fn();
  const onMessageChange = jest.fn();
  render(
    <Settings
      duration={5}
      news={["https://news.google.com/news/rss", "http://example.com"]}
      size={30}
      time
      transition={0.25}
      onDurationChange={onDurationChange}
      onNewsChange={onNewsChange}
      onSizeChange={onSizeChange}
      onTimeChange={onTimeChange}
      onTransitionChange={onTransitionChange}
      onMessageChange={onMessageChange}
    />
  );

  expect(screen.getByLabelText("Default Slide Duration")).toHaveValue(5);
  expect(screen.getByLabelText("News Sources")).toHaveValue(
    "https://news.google.com/news/rss,http://example.com"
  );
  expect(screen.getByLabelText("Logo Size")).toHaveValue(30);
  expect(screen.getByLabelText("Time Visibility")).toHaveValue("show");
  expect(screen.getByLabelText("Transition Time")).toHaveValue(0.25);
});

test("updates data", () => {
  const onDurationChange = jest.fn();
  const onNewsChange = jest.fn();
  const onSizeChange = jest.fn();
  const onTimeChange = jest.fn();
  const onTransitionChange = jest.fn();
  const onMessageChange = jest.fn();
  render(
    <Settings
      duration={5}
      news={["https://news.google.com/news/rss", "http://example.com"]}
      size={30}
      time
      transition={0.25}
      onDurationChange={onDurationChange}
      onNewsChange={onNewsChange}
      onSizeChange={onSizeChange}
      onTimeChange={onTimeChange}
      onTransitionChange={onTransitionChange}
      onMessageChange={onMessageChange}
    />
  );

  userEvent.type(screen.getByLabelText("Default Slide Duration"), "0");
  userEvent.type(screen.getByLabelText("News Sources"), "f");
  userEvent.type(screen.getByLabelText("Logo Size"), "0");
  userEvent.selectOptions(screen.getByLabelText("Time Visibility"), "hide");
  userEvent.type(screen.getByLabelText("Transition Time"), "6");
  userEvent.click(screen.getByText("Refresh Slideshow"));

  expect(onDurationChange).toHaveBeenLastCalledWith(50);
  expect(onNewsChange).toHaveBeenLastCalledWith([
    "https://news.google.com/news/rss",
    "http://example.comf",
  ]);
  expect(onSizeChange).toHaveBeenLastCalledWith(300);
  expect(onTimeChange).toHaveBeenLastCalledWith(false);
  expect(onTransitionChange).toHaveBeenLastCalledWith(0.256);
  expect(onMessageChange).toHaveBeenCalledWith("reload");
});
