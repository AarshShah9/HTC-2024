const getCountryColor = (countryIso: string): string => {
  // Simple "hash" function based on country code
  const hash = Array.from(countryIso).reduce(
    (acc: number, char: string) => acc + char.charCodeAt(0),
    0,
  );

  // Generate RGB values by manipulating the hash
  const red = (hash * 16) % 256;
  const green = (hash * 32) % 256;
  const blue = (hash * 64) % 256;

  return `rgb(${red}, ${green}, ${blue})`;
};

export { getCountryColor };
