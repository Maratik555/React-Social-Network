import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("it shows the expected text when clicked (testing the wrong way!)", () => {
    const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("SUBSCRIBE TO BASIC");
  })

  test("it shows the", () => {
    const component = create(<ProfileStatus status="SUBSCRIBE TO BASIC" />);
    const root = component.root
    let span = root.findByType('span')
    expect(span.children.length).toBe(1);
  });
});