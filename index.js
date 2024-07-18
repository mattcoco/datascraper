require("dotenv").config();
const axios = require("axios");

const sector = "agencia digital";

async function buscarLugar(lugar, sector) {
  try {
    // Realiza la primera solicitud para obtener los primeros 5 resultados
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query: sector + " en " + lugar,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );

    // Procesa los [cdad] primeros resultados
    const cdad = 20;
    const results = response.data.results.slice(0, cdad);
    for (const place of results) {
      // Realiza la solicitud de detalles para cada lugar
      const placeDetails = await axios.get(
        "https://maps.googleapis.com/maps/api/place/details/json",
        {
          params: {
            place_id: place.place_id,
            key: process.env.GOOGLE_API_KEY,
          },
        }
      );

      const detailscsv = placeDetails.data.result;

      const text =
        ";;" +
        detailscsv.name +
        ";" +
        ";;;" +
        detailscsv.formatted_phone_number +
        ";" +
        detailscsv.website +
        ";" +
        ";" +
        detailscsv.formatted_address +
        ";";

      // Places the content of text in import.csv and saves it
      const fs = require("fs");
      fs.appendFileSync("import.csv", text + "\n");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Búsqueda individual
// const lugar = "marbella";
// buscarLugar(lugar);

// Búsqueda en varias ciudades
// Array con ciudades de España de más de 150000 habitantes y menos de 500000
const ciudades = [
  "badajoz",
  "logroño",
  "marbella",
  "san cristóbal de la laguna",
  "alcorcon",
  "santander",
  "albacete",
  "burgos",
  "castellón de la plana",
  "getafe",
  "fuenlabrada",
  "leganés",
  "alcalá de henares",
  "almería",
  "pamplona",
  "santa cruz de tenerife",
  "mostoles",
  "jerez de la frontera",
  "oviedo",
  "cartagena",
  "sabadell",
  "tarrasa",
  "badalona",
  "granada",
  "elche",
  "la coruña",
  "vitoria",
  "gijon",
  "hospitalet de llobregat",
  "vigo",
  "valladolid",
  "cordoba",
  "bilbao",
  "alicante",
  "las palmas de gran canaria",
  "palma de mallorca",
  "murcia",
];

async function buscarLugarEnVariasCiudades(ciudades) {
  for (const ciudad of ciudades) {
    await buscarLugar(ciudad, sector);
  }
}

buscarLugarEnVariasCiudades(ciudades);
