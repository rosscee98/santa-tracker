export const getLocationCoordinates = async (location: string): Promise<[number, number]> => {
    const url = `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITIONSTACK_API_KEY}&query=${encodeURI(location)}&limit=1`;
    return await fetch(url)
        .then((response) => response.json())
        .then((responseBody) => responseBody.data[0])
        .then(({ latitude, longitude }) => ([longitude, latitude]));
}