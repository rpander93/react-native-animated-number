import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface AnimatedNumberProps
  extends Omit<TextInputProps, 'editable' | 'value'> {
  formatter?: (value: number) => string;
  steps?: number;
  time?: number;
  value: number;
}

function formatFn(value: number) {
  return value.toString();
}

export default function AnimatedNumber({
  formatter = formatFn,
  steps = 15,
  time = 17,
  value,
  ...restProps
}: AnimatedNumberProps) {
  const viewValue = React.useRef<number>(value);
  const textInputRef = React.useRef<TextInput>(null);
  const timerRef = React.useRef<NodeJS.Timeout>();

  const maybeClearInterval = () => {
    if (undefined !== timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  };

  React.useEffect(() => {
    return () => maybeClearInterval();
  }, []);

  // Start updating current value whenever `value` changes
  React.useEffect(() => {
    if (viewValue.current === value) return;

    const minimumStep = value - viewValue.current > 0 ? 1 : -1;
    const stepSize = Math.floor((value - viewValue.current) / steps);

    const valuePerStep =
      minimumStep > 0
        ? Math.max(stepSize, minimumStep)
        : Math.min(stepSize, minimumStep);

    // Clamping is required to correct for rounding errors
    const clampValue =
      1 === minimumStep
        ? Math.min.bind(undefined, value)
        : Math.max.bind(undefined, value);

    timerRef.current = setInterval(() => {
      viewValue.current = Math.floor(
        clampValue(viewValue.current + valuePerStep)
      );

      textInputRef.current?.setNativeProps({
        text: formatter(viewValue.current),
      });

      if (
        (minimumStep === 1 && viewValue.current >= value) ||
        (minimumStep === -1 && viewValue.current <= value)
      ) {
        maybeClearInterval();
      }
    }, time);

    return () => maybeClearInterval();
  }, [value]);

  return (
    <TextInput
      {...restProps}
      ref={textInputRef}
      editable={false}
      value={formatter(viewValue.current)}
    />
  );
}
