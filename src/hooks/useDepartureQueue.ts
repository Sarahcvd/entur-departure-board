import { useCallback, useState } from "react";
import { getDepartures, type StopPlace } from "../api/departures";

export const useDepartureQueue = (stopId?: string) => {
  const [departures, setDepartures] = useState<StopPlace | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDepartures = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDepartures(stopId);
      console.log(data)
      setDepartures(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [stopId]);

  return { departures, loading, error, loadDepartures };
};