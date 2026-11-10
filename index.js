require('dotenv').config();
const express = require('express');
const { initializeApp, cert } = require('firebase-admin/app');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Cargar la clave privada de Firebase
const serviceAccount = require('./config/serviceAccountKey.json');

// Inicializar Firebase Admin usando las funciones importadas directamente
initializeApp({
    credential: cert(serviceAccount)
});

console.log('Firebase Admin inicializado correctamente.');

// Configurar motor de vistas EJS y lectura de datos de formularios
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importar y usar las rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('<h1>Servidor funcionando y Firebase conectado</h1><p>Todo listo para las rutas de autenticación.</p>');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});