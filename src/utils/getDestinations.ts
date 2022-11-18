import { readFileSync } from 'fs';

const parseArrivalTime = (time: string) => {
    const hour = parseInt(time.substring(0, 2));
    const minute = parseInt(time.substring(3, 5));
    //TODO: rethink day logic, this feels dodgy
    const day = hour < 12 ? 25 : 24;

    //TODO: remove hardcoded year
    return new Date(2022, 11, day, hour, minute);
}

export const getDestinations = () => {
    const destinations = readFileSync('src/utils/input.txt', 'utf-8')
        .split(/\r?\n/)
        .map((line) => {
            const elements = line.split("(");
            return {
                name: elements[0].trim(),
                arrivalTime: parseArrivalTime(elements[1]),
            };
        });

    return destinations;
}