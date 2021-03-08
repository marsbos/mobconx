import React from "react";
import { connect } from "mobconx";
import { RootStore } from "./stores/root.store";
import {
  ExampleComponent,
  mapDispatchToProps,
  mapStateToProps,
} from "./components/example";
import { Provider } from "mobx-react";

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
