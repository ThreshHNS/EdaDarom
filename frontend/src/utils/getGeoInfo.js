const getGeoInfo = (geo) => {
  const coords = geo.geometry.getCoordinates();
  const bounds = geo.properties.get("boundedBy");
  const address = geo.properties.get("text");
  const title = geo.properties.get("name");
  return { coords, bounds, address, title };
};

export default getGeoInfo;
