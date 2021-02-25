import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Account from "./Account";

test("doesn't update email with incorrect password", async () => {
  const user = {
    updateEmail: jest.fn(),
    reauthenticateWithCredential: jest.fn(() => Promise.reject()),
    email: "test@example.com",
  };
  render(<Account user={user} />);

  userEvent.type(screen.getByPlaceholderText("New Email"), "test2@example.com");
  userEvent.click(screen.getByText("Update Email"));
  userEvent.type(screen.getByPlaceholderText("Current Password"), "password");
  userEvent.click(screen.getByText("Log In"));

  await waitFor(() =>
    expect(screen.getByPlaceholderText("Current Password")).toBeInvalid()
  );
  expect(user.updateEmail).not.toHaveBeenCalled();
});

test("updates email", async () => {
  const user = {
    updateEmail: jest.fn(),
    reauthenticateWithCredential: jest.fn(() => Promise.resolve()),
    email: "test@example.com",
  };
  render(<Account user={user} />);

  userEvent.type(screen.getByPlaceholderText("New Email"), "test2@example.com");
  userEvent.click(screen.getByText("Update Email"));
  userEvent.type(screen.getByPlaceholderText("Current Password"), "password");
  userEvent.click(screen.getByText("Log In"));

  await waitForElementToBeRemoved(() =>
    screen.getByPlaceholderText("Current Password")
  );
  expect(user.updateEmail).toHaveBeenCalledWith("test2@example.com");
});

test("doesn't update password with incorrect password", async () => {
  const user = {
    updatePassword: jest.fn(),
    reauthenticateWithCredential: jest.fn(() => Promise.reject()),
    email: "test@example.com",
  };
  render(<Account user={user} />);

  userEvent.type(screen.getByPlaceholderText("New Password"), "password2");
  userEvent.click(screen.getByText("Update Password"));
  userEvent.type(screen.getByPlaceholderText("Current Password"), "password");
  userEvent.click(screen.getByText("Log In"));

  await waitFor(() =>
    expect(screen.getByPlaceholderText("Current Password")).toBeInvalid()
  );
  expect(user.updatePassword).not.toHaveBeenCalled();
});

test("updates password", async () => {
  const user = {
    updatePassword: jest.fn(),
    reauthenticateWithCredential: jest.fn(() => Promise.resolve()),
    email: "test@example.com",
  };
  render(<Account user={user} />);

  userEvent.type(screen.getByPlaceholderText("New Password"), "password2");
  userEvent.click(screen.getByText("Update Password"));
  userEvent.type(screen.getByPlaceholderText("Current Password"), "password");
  userEvent.click(screen.getByText("Log In"));

  await waitForElementToBeRemoved(() =>
    screen.getByPlaceholderText("Current Password")
  );
  expect(user.updatePassword).toHaveBeenCalledWith("password2");
});

test("doesn't delete account with incorrect password", async () => {
  const user = {
    delete: jest.fn(),
    reauthenticateWithCredential: jest.fn(() => Promise.reject()),
    email: "test@example.com",
  };
  render(<Account user={user} />);

  userEvent.click(screen.getByText("Delete Account"));
  userEvent.type(screen.getByPlaceholderText("Current Password"), "password");
  userEvent.click(screen.getByText("Log In"));

  await waitFor(() =>
    expect(screen.getByPlaceholderText("Current Password")).toBeInvalid()
  );
  expect(user.delete).not.toHaveBeenCalled();
});

test("deletes account", async () => {
  const user = {
    delete: jest.fn(),
    reauthenticateWithCredential: jest.fn(() => Promise.resolve()),
    email: "test@example.com",
  };
  render(<Account user={user} />);

  userEvent.click(screen.getByText("Delete Account"));
  userEvent.type(screen.getByPlaceholderText("Current Password"), "password");
  userEvent.click(screen.getByText("Log In"));

  await waitForElementToBeRemoved(() =>
    screen.getByPlaceholderText("Current Password")
  );
  expect(user.delete).toHaveBeenCalled();
});
