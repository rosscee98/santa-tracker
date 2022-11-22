const findPositionBetweenLocations = (
    prevLocation: { name: string, arrivalTime: Date, coords: [number, number] },
    nextLocation: { name: string, arrivalTime: Date, coords: [number, number] }
): [number, number] => {
    const now = new Date();

    const spent = Math.ceil((now.getTime() - prevLocation.arrivalTime.getTime()) / 1000 / 60)
    const remaining = Math.ceil((nextLocation.arrivalTime.getTime() - now.getTime()) / 1000 / 60)
    const progress = spent / (spent + remaining);

    const [prevLng, prevLat] = prevLocation.coords;
    const [nextLng, nextLat] = nextLocation.coords;

    const currLng = parseFloat((((nextLng - prevLng) * progress) + prevLng).toFixed(4))
    const currLat = parseFloat((((nextLat - prevLat) * progress) + prevLat).toFixed(4))

    return [currLng, currLat];
}

export const getCurrentPosition = (locations: { name: string, arrivalTime: Date, coords: [number, number] }[]): [number, number] => {
    const now = new Date();
    const nextLocationIndex = locations.findIndex(({ arrivalTime }) => now < arrivalTime);

    if (nextLocationIndex === -1) {
        return locations[locations.length - 1].coords;
    }

    if (nextLocationIndex === 0) {
        return locations[0].coords;
    }

    return findPositionBetweenLocations(
        locations[nextLocationIndex - 1],
        locations[nextLocationIndex],
    );
}