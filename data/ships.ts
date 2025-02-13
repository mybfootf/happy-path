const getRandomCoordinate = (min, max) =>
  (Math.random() * (max - min) + min).toFixed(4);

const ships = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Ship ${i + 1}`,
  mmsi: `10000000${i + 1}`,
  lat: parseFloat(getRandomCoordinate(20, 35)), // Mid-Atlantic (latitude range)
  lng: parseFloat(getRandomCoordinate(-45, -30)), // Mid-Atlantic (longitude range)
  risk: ['low', 'medium', 'high'][
    Math.floor(Math.random() * 3)
  ], // Random risk level
  course: Math.floor(Math.random() * 360), // Random course
}));

export default ships;
