import "./App.css";
import { NetworkInfoDisplay } from "./components/NetworkInfoDisplay";
import { NetworkInfoContextProvider } from "./contexts/NetworkInfoContextProvider";

function App() {
  return (
    <div className="App">
      <NetworkInfoContextProvider>
        <NetworkInfoDisplay />
      </NetworkInfoContextProvider>
    </div>
  );
}

export default App;
