import {  QUERY } from "../graphql/query";

interface StopTime {
  aimedArrivalTime: string;
  expectedArrivalTime: string;
  destinationDisplay: {
    frontText: string;
  };
  serviceJourney: {
    line: {
      id: string;
      name: string;
      transportMode: string;
      publicCode: string;
    };
  };
}

export interface StopPlace {
  id: string;
  name: string;
  estimatedCalls: StopTime[];
}

interface ApiResponse {
  data: {
    stopPlace: StopPlace;
  };
}

export async function getDepartures(stopId: string = "NSR:StopPlace:4000"): Promise<StopPlace> {
  const response = await fetch('https://api.entur.io/journey-planner/v3/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ET-Client-Name': 'departure-board-demo',
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { id: stopId },
    }),
    next: { revalidate: 30 }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: ApiResponse = await response.json();
  return result.data.stopPlace;
}