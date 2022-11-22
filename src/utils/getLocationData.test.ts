import { getLocationData } from './getLocationData'

const testLocations = [
    { name: "Egvekinot", arrivalTime: new Date("2022-12-24T21:00:00.000Z"), coords: [-179.1225, 66.3237] },
    { name: "Auckland", arrivalTime: new Date("2022-12-24T22:00:00.000Z"), coords: [174.7645, -36.8509] },
    { name: "Jakarta", arrivalTime: new Date("2022-12-24T22:45:00.000Z"), coords: [106.8451, -6.2146] },
    { name: "Astana", arrivalTime: new Date("2022-12-24T23:30:00.000Z"), coords: [71.4704, 51.1605] },
    { name: "Pretoria", arrivalTime: new Date("2022-12-25T00:45:00.000Z"), coords: [28.1881, -25.7464] },
    { name: "Paris", arrivalTime: new Date("2022-12-25T01:30:00.000Z"), coords: [2.3522, 48.8566] },
    { name: "Reykjavík", arrivalTime: new Date("2022-12-25T02:30:00.000Z"), coords: [-21.9426, 64.1466] },
    { name: "Fermont", arrivalTime: new Date("2022-12-25T03:00:00.000Z"), coords: [-67.0843, 52.7954] },
    { name: "New York City", arrivalTime: new Date("2022-12-25T03:45:00.000Z"), coords: [-74.006, 40.7128] },
    { name: "Los Angeles", arrivalTime: new Date("2022-12-25T04:45:00.000Z"), coords: [-118.2437, 34.0522] },
    { name: "Mexico City", arrivalTime: new Date("2022-12-25T05:30:00.000Z"), coords: [-99.1332, 19.4326] },
    { name: "Bogotá", arrivalTime: new Date("2022-12-25T06:15:00.000Z"), coords: [-74.0721, 4.711] },
    { name: "Belo Horizonte", arrivalTime: new Date("2022-12-25T06:45:00.000Z"), coords: [-43.9387, -19.9191] },
    { name: "Ushuaia", arrivalTime: new Date("2022-12-25T07:30:00.000Z"), coords: [-68.3029, -54.8019] },
]

const mockDate = (date: Date) => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(date);
}

test.each([
    ["2022-12-24T20:00:00.000Z", "Arriving in Egvekinot in 60 minutes"],
    ["2022-12-24T20:01:00.000Z", "Arriving in Egvekinot in 59 minutes"],
    ["2022-12-24T20:59:00.000Z", "Arriving in Egvekinot in 1 minute"],
    ["2022-12-24T20:59:40.000Z", "Arriving in Egvekinot in 1 minute"],
    ["2022-12-24T21:00:00.000Z", "Arriving in Auckland in 60 minutes"],
    ["2022-12-24T23:30:00.000Z", "Arriving in Pretoria in 75 minutes"],
    ["2022-12-26T00:00:00.000Z", "Santa's done for this year!"],
])('returns correct output for date %s', (datestring, summaryOutput) => {
    mockDate(new Date(datestring));
    expect(getLocationData()).toEqual(
        expect.objectContaining({
            locations: testLocations,
            // currentPosition: [1, 1],
            summary: summaryOutput
        })
    );
});

test('return coordinates of first location when route yet to begin', () => {
    mockDate(new Date("2022-12-24T20:00:00.000Z"));
    expect(getLocationData()).toEqual(
        expect.objectContaining({
            currentPosition: [-179.1225, 66.3237]
        })
    );
})

test('returns coordinates of last location when route finished', () => {
    mockDate(new Date("2022-12-26T00:00:00.000Z"));
    expect(getLocationData()).toEqual(
        expect.objectContaining({
            currentPosition: [-68.3029, -54.8019]
        })
    );
})

test('returns coordinates of current position when route in progress', () => {
    mockDate(new Date("2022-12-24T21:15:00.000Z"));
    expect(getLocationData()).toEqual(
        expect.objectContaining({
            currentPosition: [-90.6508, 40.5301]
        })
    );
})