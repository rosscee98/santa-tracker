import { getDestinations } from './getDestinations';

export const findTimeUntilNextDestination = async () => {
    const now = new Date();
    const destinations = await getDestinations();
    const nextDestination = destinations.find(({ arrivalTime }) => now < arrivalTime);

    if (!nextDestination) {
        return "Santa's done for this year!";
    }

    const timeDifferenceInWholeMinutes = Math.ceil((nextDestination.arrivalTime.getTime() - now.getTime()) / 1000 / 60);
    return `Arriving in ${nextDestination.name} in ${timeDifferenceInWholeMinutes} minute${timeDifferenceInWholeMinutes > 1 ? "s" : ""}`;
}
