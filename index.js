const express = require('express');
const app = express();

// Middlewares
app.use(express.static('public'));
app.use(express.json());

// Función para obtener la fecha en formato UTC
const getUTCDate = (date) => {
  return new Date(date).toUTCString();
};

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta para manejar solicitudes a /api/:date?
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // Si no se proporciona ninguna fecha, obtener la fecha actual
  if (!date) {
    const currentDate = new Date();
    res.json({
      unix: currentDate.getTime(),
      utc: getUTCDate(currentDate)
    });
    return;
  }

  // Si se proporciona una fecha
  const parsedDate = new Date(date);
  if (parsedDate.toString() === 'Invalid Date') {
    // Si la fecha proporcionada no es válida, devolver un error
    res.json({ error: 'Invalid Date' });
  } else {
    // Si la fecha proporcionada es válida, devolver el objeto JSON requerido
    res.json({
      unix: parsedDate.getTime(),
      utc: getUTCDate(parsedDate)
    });
  }
});

// Ruta para manejar solicitudes a /api/1451001600000
app.get("/api/:timestamp", (req, res) => {
  const { timestamp } = req.params;
  const parsedTimestamp = new Date(parseInt(timestamp));

  if (parsedTimestamp.toString() === 'Invalid Date') {
    // Si el timestamp proporcionado no es válido, devolver un error
    res.json({ error: 'Invalid Timestamp' });
  } else {
    // Si el timestamp proporcionado es válido, devolver el objeto JSON requerido
    res.json({
      unix: parsedTimestamp.getTime(),
      utc: getUTCDate(parsedTimestamp)
    });
  }
});

// Ruta para manejar todas las demás solicitudes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
