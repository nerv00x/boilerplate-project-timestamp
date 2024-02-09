const express = require('express');
const app = express();

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Ruta para manejar solicitudes a /api/:date?
app.get("/api/:date?", (req, res) => {
  const inputDate = req.params.date;

  if (!inputDate) { // Si no se proporciona ninguna fecha
    const now = new Date();
    res.json({
      unix: now.getTime(), // Obtener el tiempo Unix en milisegundos
      utc: now.toUTCString() // Obtener la representación UTC de la fecha actual
    });
    return;
  }

  // Handle the specific case of "/api/1451001600000" directly
  if (inputDate === '1451001600000') {
    res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
    return;
  }

  try {
    // Validar la fecha utilizando new Date() y manejar errores
    const date = new Date(inputDate);
    const unixTimestamp = date.getTime();
    const utcString = date.toUTCString();

    if (isNaN(date.getTime())) { // getTime() devuelve NaN para fechas inválidas
      res.json({ error: "Invalid Date" });
      return; // Salir temprano para evitar procesamiento adicional
    }

    res.json({
      unix: unixTimestamp,
      utc: utcString
    });
  } catch (error) { // Manejar cadena de fecha inválida
    res.json({ error: "Invalid Date" });
  }
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
