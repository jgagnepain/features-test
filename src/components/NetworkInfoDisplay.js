// @flow
import * as React from "react";
import { NetworkInfoContext } from "../contexts/NetworkInfoContextProvider";

const { useContext } = React;

export const NetworkInfoDisplay = (): React.Node => {
  const [
    isOnline,
    speed,
    smImageSpeed,
    mdImageSpeed,
    lgImageSpeed,
  ] = useContext(NetworkInfoContext);

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
      <p>
        SM Image Speed:{" "}
        {smImageSpeed ? `${smImageSpeed.toFixed(2)} Mb/s` : "unavailable"}
      </p>
      <p>
        MD Image Speed:{" "}
        {mdImageSpeed ? `${mdImageSpeed.toFixed(2)} Mb/s` : "unavailable"}
      </p>
      <p>
        LG Image Speed:{" "}
        {lgImageSpeed ? `${lgImageSpeed.toFixed(2)} Mb/s` : "unavailable"}
      </p>
    </>
  );
};
