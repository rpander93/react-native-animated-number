# React Native Animated Number

## What is this?
This component renders a text that smoothly animates to new values as props change.

[Example snack](https://snack.expo.io/rk7n_5DIH)

Other implementations exist. This one is different because it uses a <TextInput /> rather than a <Text /> component and uses [setNativeProps](https://facebook.github.io/react-native/docs/direct-manipulation) to update the value. The benefit of this is that it is much more performant than using state to update the value so the experience is much smoother.

## How to use

First install the package with Yarn or npm.

```
yarn add react-native-animated-number
```

Import the component from the package. The "value" prop is the number the component should animate to.

```javascript
import AnimatedNumber from "react-native-animated-number";

<AnimatedNumber value={100} />
```

The component accepts all props from <TextInput />, plus the following:

```javascript
interface Props {
  /** The number of steps it should take to update from an old value to a new value */
  steps: number;
  /** The time between each update */
  time: number;
  /** The value the component should animate to. The component will animate to te new value when this prop changes */
  value: number;
}
```
