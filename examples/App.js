import React from "react";
import { ExampleComponent } from "./ExampleComponent";
import { RootStore } from "./root.store";
import { mapDispatchToProps, mapStateToProps } from "./state";
import { Provider } from 'mobx-react'

// The root store
const rootStore = new RootStore();

// Connected component
const ConnectedExampleComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleComponent);

export const App = () => (
  <>
    <Provider rootStore={rootStore}>
      <ConnectedExampleComponent />
    </Provider>
  </>
);
