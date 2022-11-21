import { findCurrentPosition } from './findCurrentPosition'
import { mockDate } from './testUtils';

test('return coordinates of first location when route yet to begin', () => {
    mockDate(new Date("2022-12-24T20:00:00.000Z"));
    expect(findCurrentPosition()).toEqual([-179.1225, 66.3237]);
})

test('returns coordinates of last location when route finished', () => {
    mockDate(new Date("2022-12-26T00:00:00.000Z"));
    expect(findCurrentPosition()).toEqual([-68.3029, -54.8019]);
})

test('returns coordinates of current position when route in progress', () => {
    mockDate(new Date("2022-12-24T21:15:00.000Z"));
    expect(findCurrentPosition()).toEqual([-90.6508, 40.5301]);
})