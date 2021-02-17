import "./App.css";
import {
  NetworkInfoContext,
  NetworkInfoContextProvider,
} from "./contexts/NetworkInfoContextProvider";

function App() {
  return (
    <div className="App">
      <NetworkInfoContextProvider>
        <NetworkInfoContext.Consumer>
          {([isOnline, speed, smImageSpeed, mdImageSpeed, lgImageSpeed]) => {
            return (
              <>
                <p>
                  Online Status:
                  {isOnline ? "You are online" : "You are offline"}
                </p>
                <p>
                  Navigator connection speed:
                  {speed ? speed + "Mb/s" : "Unavailable"}
                </p>
                <p>SM Image Speed: {smImageSpeed}</p>
                <p>MD Image Speed: {mdImageSpeed}</p>
                <p>LG Image Speed: {lgImageSpeed}</p>
              </>
            );
          }}
        </NetworkInfoContext.Consumer>
      </NetworkInfoContextProvider>
    </div>
  );
}

export default App;
