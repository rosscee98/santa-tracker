import { getDestinations } from './getDestinations';

export const getDestinationInfo = async () => {
    const now = new Date();
    const destinations = await getDestinations();
    const nextDestination = destinations.find(({ arrivalTime }) => now < arrivalTime);

    let label;
    if (!nextDestination) {
        label = "Santa's done for this year!";
    } else {
        const timeDifferenceInWholeMinutes = Math.ceil((nextDestination.arrivalTime.getTime() - now.getTime()) / 1000 / 60);
        label = `Arriving in ${nextDestination.name} in ${timeDifferenceInWholeMinutes} minute${timeDifferenceInWholeMinutes > 1 ? "s" : ""}`;
    }

    return {
        label: label,
        destinations: destinations,
    }
}