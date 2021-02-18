// @flow
import { useCallback, useState } from "react";
import { useInterval } from "./useInterval";

export const useImageDownloadSpeed = (
  imageUrl: string,
  imageSizeInKb: number,
  delay?: number = 2000
): number | null => {
  const [speed, setSpeed] = useState<number | null>(null);

  const getSpeedInMbps = (start: number, end: number, sizeInKbs: number) => {
    const timeDuration = (end - start) / 1000; // get time in seconds
    const speedInKbps = sizeInKbs / timeDuration;
    return speedInKbps / 1000;
  };

  const fetchTestImage = useCallback(() => {
    let startTime: number;
    let endTime: number;
    let url: string;
    const downloadImgSrc = new Image();
    downloadImgSrc.onload = function () {
      endTime = new Date().getTime();
      const s = getSpeedInMbps(startTime, endTime, imageSizeInKb);
      setSpeed(s);
    };
    startTime = new Date().getTime();
    url = `${imageUrl}?${startTime}`;
    downloadImgSrc.src = url;
  }, [imageUrl, imageSizeInKb]);

  useInterval(fetchTestImage, delay);

  return speed;
};
