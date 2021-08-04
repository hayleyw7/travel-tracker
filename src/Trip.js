class Trip {
  constructor(tripsData, destinationsData) {
    this.id = tripsData.id,
    this.userID = tripsData.userID,
    this.destinationID = tripsData.destinationID,
    this.travelers = tripsData.travelers,
    this.date = tripsData.date,
    this.duration = tripsData.duration,
    this.status = tripsData.status,
    this.suggestedActivities = tripsData.suggestedActivities,
    this.destinationsData = destinationsData
  }
}

export default Trip;