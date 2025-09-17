'use client';

import { useCallback, useEffect } from 'react';
import type { StopPlace } from '@/src/api/departures';
import { Departure } from './Departure';
import { useDepartureQueue } from '../hooks/useDepartureQueue';

type BoardProps = {
  stopPlace: StopPlace;
};

export const Board = ({ stopPlace }: BoardProps) => {
  const { departures, loading, error, loadDepartures } = useDepartureQueue();

  useEffect(() => {
    loadDepartures();
  }, [loadDepartures]);

  const getDelayMinutes = useCallback((aimed: string, expected: string) => {
    const aimedTime = new Date(aimed);
    const expectedTime = new Date(expected);
    return Math.round((expectedTime.getTime() - aimedTime.getTime()) / (1000 * 60));
  }, []);

  const getDelayStatus = useCallback((delayMinutes: number) => {
    if (delayMinutes > 0) {
      return {
        text: `+${delayMinutes} min`,
        className: 'text-red-600'
      };
    } else if (delayMinutes < 0) {
      return {
        text: `${delayMinutes} min`,
        className: 'text-green-600'
      };
    }
    return {
      text: 'I rute',
      className: 'text-green-600'
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold">Avganger: {stopPlace.name}</h1>
      <p className="border-b border-gray-200 py-2">Sanntidsinformasjon om avganger</p>

      <div>
        <div className='grid grid-cols-4 gap-4 font-bold border-b border-gray-200 py-2 mt-4'>
          <p>Linje</p>
          <p>Destinasjon</p>
          <p>Forventet avgang</p>
          <p>Status</p>
        </div>
        {loading && <p>Laster avganger...</p>}
        {departures?.estimatedCalls?.map((departure, index) => {
          const delayMinutes = getDelayMinutes(
            departure.aimedArrivalTime,
            departure.expectedArrivalTime
          );
          const delayStatus = getDelayStatus(delayMinutes);

          return (
            <Departure
              key={`${departure.destinationDisplay.frontText}-${index}`}
              transportMode={departure.serviceJourney.line.transportMode}
              publicCode={departure.serviceJourney.line.publicCode}
              frontText={departure.destinationDisplay.frontText}
              aimedArrivalTime={departure.aimedArrivalTime}
              delayStatus={delayStatus}
            />
          )
        })}
      </div>
    </div>
  );
};