import { useCallback, useRef, useState } from "react";
import { getDepartures, type StopPlace } from "../api/departures";

export const useDepartureQueue = () => {
  const [departures, setDepartures] = useState<StopPlace | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isRequestActive = useRef(false);
  const pendingRequest = useRef(false);

    const executeRequest = useCallback(async () => {
      if(isRequestActive.current){
        pendingRequest.current = true;
        return;
      }
      isRequestActive.current = true;
      setLoading(true);
      setError(null);
      try {
      const data = await getDepartures();
      setDepartures(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      isRequestActive.current = false;

      if (pendingRequest.current) {
        pendingRequest.current = false;
        executeRequest();
      }
    }
    }, []);

  const loadDepartures = useCallback(async () => {
    executeRequest();
  }, [executeRequest]);

  return { departures, loading, error, loadDepartures };
};