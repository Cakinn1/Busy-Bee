import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BottomBanner from "@/components/BottomBanner";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

// Mocking the next/router module to provide a mock implementation of the useRouter hook
jest.mock("next/router", () => ({
  // Mocking the useRouter hook to return a function
  useRouter: jest.fn().mockReturnValue({
    // Returning a simple object representing the router state
    pathname: "/", // Simulating the current pathname being "/"
    // Other properties such as query, push, etc., can be added if needed for specific test cases
  }),
}));

describe("bottom banner rendering", () => {
  // if no user exist dont render banner (no user is logged in)
  it("doesn't render banner if no user exists (user is logged in)", () => {
    // creates a testUser within setUser function
    store.dispatch({ type: "user/setUser", payload: { username: "testUser" } });

    render(
      <Provider store={store}>
        <BottomBanner />
      </Provider>
    );
    expect(screen.queryByText("Dont miss out on the buzz")).toBeNull();
  });

  it("does render in when username does not exist (user is not logged in)", () => {
    store.dispatch({ type: "user/setUser", payload: { username: null } });

    render(
      <Provider store={store}>
        <BottomBanner />
      </Provider>
    );
    expect(screen.queryByText("Dont miss out on the buzz")).toBeInTheDocument();
  });
});
