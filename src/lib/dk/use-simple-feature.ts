import React from "react";

type Setter<TState> = TState | (() => TState);

const useSimpleFeature = (defaultState: Setter<boolean> = false) => {
  const [initState] = React.useState(defaultState);
  const [isOn, setIsOn] = React.useState(initState);

  return React.useMemo(
    () => ({
      isOff: !isOn,
      isOn,
      set: setIsOn,
      on: () => setIsOn(true),
      off: () => setIsOn(false),
      toggle: () => setIsOn((prevIsOpen) => !prevIsOpen),
      reset: () => setIsOn(initState),
    }),
    [isOn, initState],
  );
};

export { useSimpleFeature };
