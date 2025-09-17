export const QUERY = `
query ($id: String!) {
  stopPlace(id: $id) {
    name
    id
    estimatedCalls(numberOfDepartures: 20) {
      aimedArrivalTime
      expectedArrivalTime
      destinationDisplay {
        frontText
      }
      serviceJourney {
        line {
          id
          name
          transportMode
          publicCode
        }
      }
    }
  }
}`;