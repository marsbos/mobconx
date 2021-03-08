const mapGetProp = (obj, key) => (key ? obj.get(key) : Object.fromEntries(obj));
const objGetProp = (obj, key) => (key ? obj[key] : obj);

// Type selectors:
const map = (...props) => (key, change, fn = mapGetProp) => {
  let obj;
  if (change.name) {
    obj = change.object;
  } else {
    obj = change.newValue;
  }
  const retVal = pick(
    obj,
    fn,
    props.filter((p) => p !== undefined || p !== null)
  );
  return retVal;
};
const array = (...props) => (key, change) => {
  const obj =
    change.type === "update" || change.type === "splice"
      ? change.hasOwnProperty("index")
        ? change.object
        : change.newValue
      : change.newValue;
  const retVal = pluck(obj, props);
  return retVal;
};
const object = (...props) => (key, change) => {
  const retVal = map(...props)(key, change, objGetProp);
  return retVal;
};
const primitive = () => (key, change) => {
  return change.newValue;
};

// Value selectors:
const pick = (change, getFn, props) => {
  return props && props.length
    ? props.reduce((memo, key) => {
        debugger;
        memo[key] = getFn(change, key); //change.get(curr)
        return memo;
      }, {})
    : getFn(change);
};

const pluck = (change, props) => {
  return props && props.length
    ? props.reduce((memo, curr, i) => {
        memo[i] = nth(curr)(change);
        return memo;
      }, [])
    : [...change];
};

export { map, array, object, primitive };
