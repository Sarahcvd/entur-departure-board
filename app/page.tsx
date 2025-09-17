import { getDepartures } from '@/src/api/departures';
import { Board } from '@/src/components/Board';

export default async function EnturDepartureBoard() {
  const stopPlace = await getDepartures();

  return <Board stopPlace={stopPlace} />;
}