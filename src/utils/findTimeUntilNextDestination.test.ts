import { findTimeUntilNextDestination } from './findTimeUntilNextDestination'

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
])('returns correct output for date %s', (datestring, output) => {
    mockDate(new Date(datestring));
    expect(findTimeUntilNextDestination()).toEqual(output);
});

test('returns completion string when no destinations left', () => {
    mockDate(new Date("2022-12-26T00:00:00.000Z"));
    expect(findTimeUntilNextDestination()).toEqual("Santa's done for this year!");
})