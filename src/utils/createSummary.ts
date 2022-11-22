export const createSummary = (locations: { name: string, arrivalTime: Date }[]) => {
    const now = new Date();
    const nextLocation = locations.find(({ arrivalTime }) => now < arrivalTime);

    if (!nextLocation) {
        return "Santa's done for this year!";
    }

    const timeDifferenceInWholeMinutes = Math.ceil((nextLocation.arrivalTime.getTime() - now.getTime()) / 1000 / 60);
    return `Arriving in ${nextLocation.name} in ${timeDifferenceInWholeMinutes} minute${timeDifferenceInWholeMinutes > 1 ? "s" : ""}`;
}