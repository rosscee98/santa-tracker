export const mockDate = (date: Date) => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(date);
}