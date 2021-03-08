const createActionsFromStore = (obj, store) => {
  const isObject = (val) => typeof val === "object" && !Array.isArray(val);
  const isMobxAction = (val, key) =>
    val && val[key] && val[key].hasOwnProperty("isMobxAction");
  const addDelimiter = (a, b) => (a ? `${a}.${b}` : b);

  const paths = (obj = {}, head = "") => {
    return Object.entries(obj).reduce((objWithProps, [key, value]) => {
      let fullPath = addDelimiter(head, key);
      let action = undefined;
      if (isMobxAction(obj, key)) {
        const fullActionPathLens = lensPath(
          fullPath.replace(".", ",").split(",")
        );
        // Action:
        action = { isAction: true, action: view(fullActionPathLens)(store) };
      }
      // prevent cycle
      if (obj === value[head]) {
        return objWithProps;
      }
      if (isObject(value)) {
        return objWithProps.concat(
          { name: key, path: fullPath, ...action },
          paths(value, fullPath)
        );
      } else {
        return objWithProps.concat({
          name: key,
          path: fullPath,
          ...action,
        });
      }
    }, []);
  };
  return paths(obj);
};

const actionsToMap = (storeProps) => {
  return Object.entries(storeProps.filter((p) => p.isAction)).reduce(
    (memo, [, { name, action }]) => {
      memo[name] = action;
      return memo;
    },
    {}
  );
};

const createStoreReducer = (actions) => {
  const memoActionsByKey = {};
  return (action) => {
    const { type, payload } = action;
    if (memoActionsByKey[type]) {
      return memoActionsByKey[type](payload);
    }
    const _storeAction = Object.entries(actions).find(([key, val]) => {
      if (key === type) {
        return val;
      }
    });

    if (_storeAction) {
      memoActionsByKey[_storeAction[0]] = _storeAction[1];
      _storeAction[1](payload);
    }
  };
};
const createActions = (store) => {
  return actionsToMap(createActionsFromStore(store, store));
};

export { createStoreReducer, createActions };
