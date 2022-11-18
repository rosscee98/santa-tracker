import { getDestinations } from './getDestinations';

export const findTimeUntilNextDestination = () => {
    const now = new Date();

    const destinations = getDestinations();
    console.log(destinations);

    return true;
}