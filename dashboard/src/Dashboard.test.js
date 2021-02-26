import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "./Dashboard";

test("signs out on button press", () => {
  const onChange = jest.fn();
  const signOut = jest.fn();
  render(
    <Dashboard
      onChange={onChange}
      signOut={signOut}
      storageRef={{}}
      user={{}}
    />
  );

  userEvent.click(screen.getByText("Sign Out"));

  expect(signOut).toBeCalled();
});
