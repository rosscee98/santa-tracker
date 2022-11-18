import { getDestinations } from './getDestinations';

export const findTimeUntilNextDestination = () => {
    const now = new Date();
    const destinations = getDestinations();
    const nextDestination = destinations.find(({ arrivalTime }) => now < arrivalTime);

    if (!nextDestination) {
        return "Santa's done for this year!";
    }

    const timeDifferenceInMinutes = (nextDestination.arrivalTime.getTime() - now.getTime()) / 1000 / 60;
    return `Arriving in ${nextDestination.name} in ${timeDifferenceInMinutes} minutes`;
}