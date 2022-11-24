import { itinerary } from './itinerary';
import coordinates from './coordinates.json';

type CoordinatesInput = {
    [key: string]: {
        lat: number,
        lng: number,
    }
}

const parseArrivalTime = (time: string) => {
    const hour = parseInt(time.substring(0, 2));
    const minute = parseInt(time.substring(3, 5));
    //TODO: rethink day logic, this feels dodgy
    const day = hour < 12 ? 25 : 24;

    //TODO: remove hardcoded year
    return new Date(2022, 11, day, hour, minute);
}

const getLocationCoords = (name: string) => {
    return Object.values((coordinates as CoordinatesInput)[name]).reverse() as [number, number];
}

export const buildLocations = () => (
    itinerary
        .split(/\r?\n/)
        .filter((line) => !!line)
        .map((line) => {
            const elements = line.split("(");
            const name = elements[0].trim();
            return {
                name,
                arrivalTime: parseArrivalTime(elements[1]),
                coords: getLocationCoords(name),
            };
        })
)