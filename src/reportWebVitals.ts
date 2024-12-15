import { onCLS, onFID, onFCP, onLCP, onTTFB } from "web-vitals";

type MetricHandler = (metric: any) => void;

const reportWebVitals = (onPerfEntry?: MetricHandler) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
