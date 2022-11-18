import { findTimeUntilNextDestination } from './findTimeUntilNextDestination'

const mockDate = (date: Date) => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(date);
}

test('returns correct output string', () => {
    mockDate(new Date("2022-12-24T20:00:00.000Z"));
    expect(findTimeUntilNextDestination()).toEqual("Arriving in Egvekinot in 60 minutes");
})

test('returns completion string when no destinations left', () => {
    mockDate(new Date("2022-12-26T00:00:00.000Z"));
    expect(findTimeUntilNextDestination()).toEqual("Santa's done for this year!");
})