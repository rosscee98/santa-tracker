import { buildLocations } from './buildLocations';
import { createSummary } from './createSummary';
import { getCurrentPosition } from './getCurrentPosition';

export const getLocationData = () => {
    const locations = buildLocations();
    const currentPosition = getCurrentPosition(locations);
    const summary = createSummary(locations);

    return {
        locations,
        currentPosition,
        summary,
    }
}