import { getDestinations } from './getDestinations';
import locationsJson from './locations.json';

const locations = Object.entries(locationsJson);

const findCoordinatesForDestination = (destination: {
    name: string;
    arrivalTime: Date;
}) => {
    const { lat, lng } = locations.find((location) => location[0] === destination.name)![1];
    return [lng, lat];
}

const findPositionBetweenDestinations = (prevDestination: any, nextDestination: any) => {
    const now = new Date();
    // const now = new Date("2022-12-24T22:40:00.000Z");

    const spent = Math.ceil((now.getTime() - prevDestination.arrivalTime.getTime()) / 1000 / 60)
    const remaining = Math.ceil((nextDestination.arrivalTime.getTime() - now.getTime()) / 1000 / 60)
    const progress = spent / (spent + remaining);

    const [prevLng, prevLat] = findCoordinatesForDestination(prevDestination);
    const [nextLng, nextLat] = findCoordinatesForDestination(nextDestination);

    const newLng = parseFloat((((nextLng - prevLng) * progress) + prevLng).toFixed(4))
    const newLat = parseFloat((((nextLat - prevLat) * progress) + prevLat).toFixed(4))

    return [newLng, newLat];
}

export const findCurrentPosition = () => {
    const now = new Date();
    // const now = new Date("2022-12-24T22:40:00.000Z");
    const destinations = getDestinations();

    const nextDestination = destinations.find(({ arrivalTime }) => now < arrivalTime);
    if (!nextDestination) {
        return findCoordinatesForDestination(destinations[destinations.length - 1]);
    }

    const nextDestinationIndex = destinations.indexOf(nextDestination);
    if (nextDestinationIndex <= 0) {
        return findCoordinatesForDestination(destinations[0]);
    }
    const prevDestination = destinations[nextDestinationIndex - 1];

    return findPositionBetweenDestinations(
        prevDestination,
        nextDestination,
    );
}