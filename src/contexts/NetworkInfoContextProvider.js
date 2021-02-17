// @flow
import * as React from "react";
import { useImageDownloadSpeed } from "../hooks/useImageDownloadSpeed";
import useInterval from "../hooks/useInterval";
const { useState, useEffect, createContext } = React;

type NavigatorWithConnection = typeof navigator & {
  connection?: {
    downlink?: number,
  },
};

type NetworkInfo = [boolean, ?number, ?number, ?number, ?number];

// Flow does not recognize the connection key on the navigator object
const navigatorWithConnection: NavigatorWithConnection = navigator;

const DELAY = 2000;

const TEST_IMAGES: { [string]: { url: string, size: number } } = {
  sm: {
    url: "https://sloth-or-speedy.s3.amazonaws.com/dog.jpg",
    size: 1.5,
  },
  md: {
    url: "https://sloth-or-speedy.s3.amazonaws.com/dog-md.jpg",
    size: 21.4,
  },
  lg: {
    url: "https://sloth-or-speedy.s3.amazonaws.com/dog-lg.jpg",
    size: 438.2,
  },
};

// Inspired by: https://medium.com/the-non-traditional-developer/checking-the-network-connection-with-a-react-hook-ec3d8e4de4ec
// Use Network tab presets to update browser speed: https://helpdeskgeek.com/networking/simulate-slow-internet-connection-testing/
// Fetching images to determine speed: https://www.geeksforgeeks.org/how-to-detect-network-speed-using-javascript/

const useNetworkInfo = (): NetworkInfo => {
  const [isOnline, setIsOnline] = useState<boolean>(window.navigator.onLine);
  const [downlink, setDownlink] = useState<number | null>(null);
  const smImageDownloadSpeed = useImageDownloadSpeed(
    TEST_IMAGES.sm.url,
    TEST_IMAGES.sm.size
  );
  const mdImageDownloadSpeed = useImageDownloadSpeed(
    TEST_IMAGES.md.url,
    TEST_IMAGES.md.size
  );
  const lgImageDownloadSpeed = useImageDownloadSpeed(
    TEST_IMAGES.lg.url,
    TEST_IMAGES.lg.size
  );

  const updateOnline = () => {
    if (downlink && !window.navigator.onLine) {
      setDownlink(0);
    }
    setIsOnline(window.navigator.onLine);
  };

  const setConnection = () => {
    if (
      !navigatorWithConnection.connection ||
      !navigatorWithConnection.connection?.downlink
    ) {
      return;
    }
    setDownlink(navigatorWithConnection.connection?.downlink);
  };

  useInterval(setConnection, DELAY);

  useEffect(() => {
    window.addEventListener("offline", updateOnline);
    window.addEventListener("online", updateOnline);

    return () => {
      window.removeEventListener("offline", updateOnline);
      window.removeEventListener("online", updateOnline);
    };
  }, []);

  return [
    isOnline,
    downlink,
    smImageDownloadSpeed,
    mdImageDownloadSpeed,
    lgImageDownloadSpeed,
  ];
};

export const NetworkInfoContext: React.Context<NetworkInfo> = createContext([
  true,
  null,
  null,
  null,
  null,
]);

export const NetworkInfoContextProvider: React.StatelessFunctionalComponent<{
  children?: React.Node,
}> = ({ children }) => {
  const networkInfo = useNetworkInfo();
  return (
    <NetworkInfoContext.Provider value={networkInfo}>
      {children}
    </NetworkInfoContext.Provider>
  );
};
