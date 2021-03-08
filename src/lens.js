import { lensPath, view } from "ramda";

const createLens = (path, updateOnly = false) => {
  const lastDotIndex = path.lastIndexOf(".");
  const lastPathPart = path.slice(lastDotIndex + 1);
  const fullPath = path.replaceAll(".", ",").split(",");

  const lensConfig = {
    assignmentLens: undefined,
    fullPathLens: lensPath(fullPath),
  };

  const pathToPrimitiveLike = path.slice(0, lastDotIndex).split(".");
  lensConfig.assignmentLens = {
    lens: lensPath(pathToPrimitiveLike),
    prop: lastPathPart,
  };

  return (store, selectorFn) => [
    {
      ref: view(lensConfig.assignmentLens.lens, store),
      prop: lensConfig.assignmentLens.prop,
      primitive: updateOnly,
      selector: selectorFn,
    },
    !updateOnly && {
      ref: view(lensConfig.fullPathLens, store),
      primitive: updateOnly,
      selector: selectorFn,
    },
  ];
};

export { createLens };
