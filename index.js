const express = require('express');
const app = express();

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Ruta para manejar solicitudes a /api/:date?
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // Si no se proporciona ninguna fecha, obtener la fecha actual
  if (!date) {
    const currentDate = new Date();
    res.json({
      unix: currentDate.getTime() // Obtener el tiempo Unix en milisegundos
    });
    return;
  }

  // Si se proporciona una fecha
  const parsedDate = new Date(date);
  console.log(parsedDate);
  if (parsedDate.toString() === 'Invalid Date') {
    // Si la fecha proporcionada no es válida, devolver un error
    res.status(400).json({ error: 'Invalid Date' });
  } else {
    // Si la fecha proporcionada es válida, devolver el tiempo Unix
    res.json({
      unix: parsedDate.getTime() // Obtener el tiempo Unix en milisegundos
    });
  }
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
