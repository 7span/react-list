import "./App.css";

import ListWrapper from "./components/list-wrapper";
import { ReactListProvider } from "@7span/react-list";
import readtListOptions from "./components/react-list";

function App() {
  return (
    <>
      <ReactListProvider config={readtListOptions}>
        <ListWrapper />
      </ReactListProvider>
    </>
  );
}

export default App;
