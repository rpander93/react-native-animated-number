import * as React from "react";
import { TextInput } from "react-native";
import { create } from "react-test-renderer";
import AnimatedNumber from "../index";

test("It should render with the initial value", () => {
  const component = create(<AnimatedNumber value={100} />);
  const instance = component.root;

  expect(instance.findByType(TextInput).props.value).toEqual("100");

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("It should update to a new value", () => {
  const component = create(<AnimatedNumber value={100} />);
  component.update(<AnimatedNumber value={200} />);

  const input = component.root.findByType(TextInput);
  /** Value should not be changed via props */
  expect(input.props.value).toEqual("100");
});
