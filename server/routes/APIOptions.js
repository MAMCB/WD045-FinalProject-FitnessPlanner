const options = [
  {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    params: { limit: "10" },
    headers: {
      "X-RapidAPI-Key": process.env.EXERCISEDB_API_KEY,
      "X-RapidAPI-Host": process.env.EXERCISEDB_API_HOST,
    },
  },
  {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/name/%7Bname%7D",
    params: { limit: "10" },
    headers: {
      "X-RapidAPI-Key": process.env.EXERCISEDB_API_KEY,
      "X-RapidAPI-Host": process.env.EXERCISEDB_API_HOST,
    },
  },
  {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/exercise/%7Bid%7D",
    headers: {
      "X-RapidAPI-Key": process.env.EXERCISEDB_API_KEY,
      "X-RapidAPI-Host": process.env.EXERCISEDB_API_HOST,
    },
  },
  {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/target/abductors",
    params: { limit: "10" },
    headers: {
      "X-RapidAPI-Key": process.env.EXERCISEDB_API_KEY,
      "X-RapidAPI-Host":process.env.EXERCISEDB_API_HOST,
    },
  },
  {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/equipment/assisted",
    params: { limit: "10" },
    headers: {
      "X-RapidAPI-Key":process.env.EXERCISEDB_API_KEY,
      "X-RapidAPI-Host":process.env.EXERCISEDB_API_HOST,
    },
  },
  {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/targetList',
  params: { limit: "10" },
  headers: {
    'X-RapidAPI-Key':process.env.EXERCISEDB_API_KEY,
    'X-RapidAPI-Host':process.env.EXERCISEDB_API_HOST,
  }
  },
  {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/equipmentList',
  params: { limit: "10" },
  headers: {
    'X-RapidAPI-Key':process.env.EXERCISEDB_API_KEY,
    'X-RapidAPI-Host':process.env.EXERCISEDB_API_HOST,
  }
  },
  {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
  params: { limit: "10" },
  headers: {
    'X-RapidAPI-Key':process.env.EXERCISEDB_API_KEY,
    'X-RapidAPI-Host':process.env.EXERCISEDB_API_HOST,
  }
  },
  {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
  params: { limit: "10" },
  params: {limit: '10'},
  headers: {
    'X-RapidAPI-Key':process.env.EXERCISEDB_API_KEY,
    'X-RapidAPI-Host':process.env.EXERCISEDB_API_HOST,
  }
}
];

module.exports = { options };