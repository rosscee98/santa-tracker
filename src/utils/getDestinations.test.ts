import { getDestinations } from './getDestinations';

const testOutput = [
    { name: "Egvekinot", arrivalTime: new Date("2022-12-24T21:00:00.000Z") },
    { name: "Auckland", arrivalTime: new Date("2022-12-24T22:00:00.000Z") },
    { name: "Jakarta", arrivalTime: new Date("2022-12-24T22:45:00.000Z") },
    { name: "Astana", arrivalTime: new Date("2022-12-24T23:30:00.000Z") },
    { name: "Pretoria", arrivalTime: new Date("2022-12-25T00:45:00.000Z") },
    { name: "Paris", arrivalTime: new Date("2022-12-25T01:30:00.000Z") },
    { name: "Reykjavík", arrivalTime: new Date("2022-12-25T02:30:00.000Z") },
    { name: "Fermont", arrivalTime: new Date("2022-12-25T03:00:00.000Z") },
    { name: "New York City", arrivalTime: new Date("2022-12-25T03:45:00.000Z") },
    { name: "Los Angeles", arrivalTime: new Date("2022-12-25T04:45:00.000Z") },
    { name: "Mexico City", arrivalTime: new Date("2022-12-25T05:30:00.000Z") },
    { name: "Bogotá", arrivalTime: new Date("2022-12-25T06:15:00.000Z") },
    { name: "Belo Horizonte", arrivalTime: new Date("2022-12-25T06:45:00.000Z") },
    { name: "Ushuaia", arrivalTime: new Date("2022-12-25T07:30:00.000Z") },
]

test('returns a correct array of destination objects', async () => {
    expect(await getDestinations()).toEqual(testOutput.map((objOutput) => expect.objectContaining(objOutput)))
})
