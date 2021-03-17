import { render, screen, waitFor, act } from "@testing-library/react";
import Slideshow from "./Slideshow";

test("renders panes", async () => {
  jest.useFakeTimers();

  const storageRef = {
    child: jest.fn((name) => ({
      getDownloadURL: jest.fn(() =>
        Promise.resolve("http://example.com/" + name)
      ),
    })),
  };
  render(
    <Slideshow
      storageRef={storageRef}
      data={{
        panes: [
          {
            rowStart: 1,
            rowEnd: 2,
            columnStart: 1,
            columnEnd: 2,
            embed: "http://example.com",
            timestamp: 12,
          },
          {
            rowStart: 1,
            rowEnd: 2,
            columnStart: 2,
            columnEnd: 3,
            slides: [
              {
                name: "slide1.jpg",
                duration: 5,
                timestamp: 56,
              },
              {
                name: "slide2.jpg",
                duration: 6,
                timestamp: 78,
              },
              {
                name: "slide3.jpg",
                duration: 7,
                timestamp: 90,
              },
            ],
            timestamp: 34,
          },
        ],
        news: [],
        size: 30,
        time: true,
        transition: 0.25,
        logo: null,
      }}
    />
  );
  await screen.findAllByAltText("Slideshow Slide");
  await screen.findByText(/No news sources/);

  expect(screen.getByTitle("Website Embed")).toHaveAttribute(
    "src",
    "http://example.com"
  );
  expect(screen.getAllByAltText("Slideshow Slide")[0]).toBeVisible();
  expect(screen.getAllByAltText("Slideshow Slide")[1]).not.toBeVisible();
  expect(screen.getAllByAltText("Slideshow Slide")[2]).not.toBeVisible();
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  await waitFor(() =>
    expect(screen.getAllByAltText("Slideshow Slide")[1]).toBeVisible()
  );
  expect(screen.getAllByAltText("Slideshow Slide")[0]).not.toBeVisible();
  expect(screen.getAllByAltText("Slideshow Slide")[2]).not.toBeVisible();
  act(() => {
    jest.advanceTimersByTime(6000);
  });
  await waitFor(() =>
    expect(screen.getAllByAltText("Slideshow Slide")[2]).toBeVisible()
  );
  expect(screen.getAllByAltText("Slideshow Slide")[0]).not.toBeVisible();
  expect(screen.getAllByAltText("Slideshow Slide")[1]).not.toBeVisible();
  act(() => {
    jest.advanceTimersByTime(7000);
  });
  await waitFor(() =>
    expect(screen.getAllByAltText("Slideshow Slide")[0]).toBeVisible()
  );
  expect(screen.getAllByAltText("Slideshow Slide")[1]).not.toBeVisible();
  expect(screen.getAllByAltText("Slideshow Slide")[2]).not.toBeVisible();
});

test("adds protocol to embed url", async () => {
  render(
    <Slideshow
      storageRef={{}}
      data={{
        panes: [
          {
            rowStart: 1,
            rowEnd: 2,
            columnStart: 1,
            columnEnd: 2,
            embed: "example.com",
            timestamp: 12,
          },
        ],
        news: [],
        size: 30,
        time: true,
        transition: 0.25,
        logo: null,
      }}
    />
  );
  await screen.findByText(/No news sources/);

  expect(screen.getByTitle("Website Embed")).toHaveAttribute(
    "src",
    "https://example.com"
  );
});

test("interperts YouTube embed url", async () => {
  render(
    <Slideshow
      storageRef={{}}
      data={{
        panes: [
          {
            rowStart: 1,
            rowEnd: 2,
            columnStart: 1,
            columnEnd: 2,
            embed:
              "youtube.com/watch?someparam=blabla&v=someid&somethingelse=something",
            timestamp: 12,
          },
        ],
        news: [],
        size: 30,
        time: true,
        transition: 0.25,
        logo: null,
      }}
    />
  );
  await screen.findByText(/No news sources/);

  expect(screen.getByTitle("Website Embed")).toHaveAttribute(
    "src",
    "https://www.youtube.com/embed/someid?autoplay=1&controls=0&loop=1&playlist=someid"
  );
});

test("displays news", async () => {
  global.fetch = jest.fn((url) =>
    Promise.resolve({
      json: jest.fn(() =>
        Promise.resolve({
          items: [
            { title: "headline 1 from " + url },
            { title: "headline 2 from " + url },
          ],
        })
      ),
    })
  );

  render(
    <Slideshow
      storageRef={{}}
      data={{
        panes: [],
        news: ["http://example.com/news1", "http://example.com/news2"],
        size: 30,
        time: true,
        transition: 0.25,
        logo: null,
      }}
    />
  );

  await screen.findByText(
    "headline 1 from https://api.rss2json.com/v1/api.json?rss_url=http://example.com/news1 \u2022 headline 2 from https://api.rss2json.com/v1/api.json?rss_url=http://example.com/news1 \u2022 headline 1 from https://api.rss2json.com/v1/api.json?rss_url=http://example.com/news2 \u2022 headline 2 from https://api.rss2json.com/v1/api.json?rss_url=http://example.com/news2"
  );
});

test("renders logo", async () => {
  const storageRef = {
    child: jest.fn((name) => ({
      getDownloadURL: jest.fn(() =>
        Promise.resolve("http://example.com/" + name)
      ),
    })),
  };
  render(
    <Slideshow
      storageRef={storageRef}
      data={{
        panes: [],
        news: [],
        size: 30,
        time: true,
        transition: 0.25,
        logo: {
          timestamp: 123,
          name: "logo.png",
        },
      }}
    />
  );
  await screen.findByText(/No news sources/);

  expect(screen.getByAltText("Logo")).toHaveAttribute(
    "src",
    "http://example.com/123"
  );
  expect(screen.getByAltText("Logo")).toHaveStyle({
    width: "30vw",
    height: "30vh",
  });
});

test("renders no logo", async () => {
  render(
    <Slideshow
      storageRef={{}}
      data={{
        panes: [],
        news: [],
        size: 30,
        time: true,
        transition: 0.25,
        logo: null,
      }}
    />
  );
  await screen.findByText(/No news sources/);

  expect(screen.queryByAltText("Logo")).not.toBeInTheDocument();
});

test("renders clock", async () => {
  render(
    <Slideshow
      storageRef={{}}
      data={{
        panes: [],
        news: [],
        size: 30,
        time: true,
        transition: 0.25,
        logo: null,
      }}
    />
  );
  await screen.findByText(/No news sources/);

  const date = new Date();
  screen.getByText(date.toLocaleTimeString());
});

test("renders no clock", async () => {
  render(
    <Slideshow
      storageRef={{}}
      data={{
        panes: [],
        news: [],
        size: 30,
        time: false,
        transition: 0.25,
        logo: null,
      }}
    />
  );
  await screen.findByText(/No news sources/);

  const date = new Date();
  expect(screen.queryByText(date.toLocaleTimeString())).not.toBeInTheDocument();
});
