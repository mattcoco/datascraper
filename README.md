# DataScraping Google Search

Este es el script que utilizo para sacar listados de lugares del tipo "agencial digital en valencia", para múltiples ciudades, y presentarlos en un archivo .csv listos para ser importados en un ficher Excel. Requiere una API key de Google Maps.

![gif_datascraper](https://github.com/datascraper/gif_datascraper.gif)

Para ejecutar este script, sigue los siguientes pasos:

1. Instala las dependencias necesarias ejecutando el siguiente comando en tu terminal:

```
npm install
```

2. Una vez que las dependencias se hayan instalado correctamente, ejecuta el siguiente comando para iniciar el script:

```
node index
```

La constante "sector" sirve para definir el lugar o sector de búsqueda (eg. software, marketing, etc.) y el array ciudades contiene todas las ciudades de España de más de 150.000 habitantes y menos de 500.000. Al lanzar el script, se generará un archivo .csv con los 20 primeros resultados de Google Maps para cada ciudad.
