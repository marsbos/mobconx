import { useEffect, useState } from "react";
import { createStoreReducer, createActions } from "./actions";

const getDisposablesFromInjectionProps = (props, setState, setReObserve) => {
  return Object.entries(props).reduce((memo, [key, lens]) => {
    const lensCfgs = lens;
    const disposers = lensCfgs
      .map(({ primitive, ref, prop, selector }) => {
        if (!ref) {
          return undefined;
        }
        if (primitive || prop) {
          return observe(ref, prop, (change) => {
            setState((state) => ({
              ...state,
              [key]: selector(key, change),
            }));
            if (!primitive) {
              setReObserve(true);
            }
          });
          //}
        } else {
          return observe(ref, (change) => {
            setState((state) => ({
              ...state,
              [key]: selector(key, change),
            }));
          });
        }
      })
      .filter((d) => d !== undefined);

    return [...memo, ...disposers];
  }, []);
};

const connect = (mapStateToProps, mapDispatchToProps) => {
  const injectorFn = inject((store) => {
    if (!mapStateToProps || typeof mapStateToProps !== "function") {
      throw new Error("mapStateToProps must be a function.");
    }
    if (mapDispatchToProps && typeof mapDispatchToProps !== "function") {
      throw new Error("mapDispatchToProps must be a function.");
    }
    // mapStateToProps:
    const selectors = mapStateToProps(store);

    // mapDispatchToProps:

    // get all actions from all stores:
    const actions = createActions(store.rootStore);
    // Make a reducer out of the store:
    const storeReducer = createStoreReducer(actions);
    // The dispatcher function
    const dispatcher = (action) => {
      storeReducer(action);
    };
    const dispatch = mapDispatchToProps(dispatcher);
    return { selectors, dispatch };
  });

  return (ComponentToConnect) => {
    const baseComponentName =
      ComponentToConnect.displayName ||
      ComponentToConnect.name ||
      (ComponentToConnect.constructor && ComponentToConnect.constructor.name) ||
      "Component";

    ComponentToConnect.displayName = `Connected${baseComponentName}`;
    return injectorFn(({ selectors, dispatch }) => {
      const [state, setState] = useState({});
      const [reObserve, setReObserve] = useState(false);

      useEffect(() => {
        const disposers = getDisposablesFromInjectionProps(
          selectors,
          setState,
          setReObserve
        );
        return () => {
          // dispose all:
          disposers.forEach((dispose) => dispose());
          setReObserve(false);
        };
      }, [reObserve]);

      return <ComponentToConnect {...state} {...dispatch} />;
    });
  };
};

export { connect };
