const camelot = {
  major: [
    { name: "8B", key: "C" },
    { name: "3B", key: "Db" },
    { name: "10B", key: "D" },
    { name: "5B", key: "Eb" },
    { name: "12B", key: "E" },
    { name: "7B", key: "F" },
    { name: "2B", key: "F#" },
    { name: "9B", key: "G" },
    { name: "4B", key: "Ab" },
    { name: "11B", key: "A" },
    { name: "6B", key: "Bb" },
    { name: "1B", key: "B" }
  ],
  minor: [
    { name: "5A", key: "C" },
    { name: "12A", key: "Db" },
    { name: "7A", key: "D" },
    { name: "2A", key: "Eb" },
    { name: "9A", key: "E" },
    { name: "4A", key: "F" },
    { name: "11A", key: "F#" },
    { name: "6A", key: "G" },
    { name: "1A", key: "Ab" },
    { name: "8A", key: "A" },
    { name: "3A", key: "Bb" },
    { name: "10A", key: "B" }
  ]
};

export const keyAndModeToCamelot = ({ key, mode }) =>
  mode ? camelot.major[key] : camelot.minor[key];
