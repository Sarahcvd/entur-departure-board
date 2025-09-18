'use client';

import { useEffect } from 'react';
import { useDepartureQueue } from '../hooks/useDepartureQueue';
import { getDelayMinutes, getDelayStatus } from '../utils/delayCalculations';
import { Departure } from './Departure';

export const Board = () => {
  const { departures, loading, error, loadDepartures } = useDepartureQueue();

  useEffect(() => {
    loadDepartures();
  }, [loadDepartures]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="text-red-600 mb-4">Feil ved lasting av data</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              type='button'
              onClick={loadDepartures}
              className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 cursor-pointer"
            >
              Prøv igjen
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
      <div className="border-b border-gray-200 py-2 flex flex-row justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold">Avganger: {departures?.name}</h1>
          <p >Sanntidsinformasjon om avganger</p>
        </div>
        <button
          className="px-4 py-2 h-fit bg-slate-600 text-white rounded hover:bg-slate-700 text-sm font-semibold cursor-pointer"
          type='button'
          onClick={loadDepartures}
          disabled={loading}
        >
          Last inn flere
        </button>
      </div>
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