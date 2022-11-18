import { getLocationCoordinates } from './getLocationCoordinates';
import { input } from './input';

const parseArrivalTime = (time: string) => {
    const hour = parseInt(time.substring(0, 2));
    const minute = parseInt(time.substring(3, 5));
    //TODO: rethink day logic, this feels dodgy
    const day = hour < 12 ? 25 : 24;

    //TODO: remove hardcoded year
    return new Date(2022, 11, day, hour, minute);
}

export const getDestinations = async () => {
    // return input
    const destinations = input
        .split(/\r?\n/)
        .filter((line) => !!line)
        .map(async (line) => {
            const elements = line.split("(");
            const name = elements[0].trim();

            return {
                name,
                arrivalTime: parseArrivalTime(elements[1]),
                coordinates: await getLocationCoordinates(name),
            };
        });

    return Promise.all(destinations);
}