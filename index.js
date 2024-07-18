const axios = require("axios");

async function searchPlaces() {
  try {
    // Realiza la primera solicitud para obtener los primeros 5 resultados
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query: "empresa de software en granada",
          key: "AIzaSyDB1gfQLQqL8M1f6kKUq0McjC4iK5F8Oxg",
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
            key: "AIzaSyDB1gfQLQqL8M1f6kKUq0McjC4iK5F8Oxg",
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

searchPlaces();
