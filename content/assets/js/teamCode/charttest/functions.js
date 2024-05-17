export function generateRandomData(numPoints) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        data.push(Math.floor(Math.random() * 100) + 1); // Zufallszahl zwischen 1 und 100
    }
    return data;
}