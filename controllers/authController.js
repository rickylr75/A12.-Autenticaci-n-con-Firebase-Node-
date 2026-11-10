const { getAuth } = require('firebase-admin/auth');

// Mostrar vista de Registro
exports.getRegister = (req, res) => {
    res.render('register');
};

// Procesar Registro de Usuario
exports.postRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Crear usuario en Firebase Authentication usando getAuth()
        const userRecord = await getAuth().createUser({
            email: email,
            password: password
        });
        console.log('Usuario creado exitosamente:', userRecord.uid);
        res.redirect('/login');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.render('register', { error: error.message });
    }
};

// Mostrar vista de Login
exports.getLogin = (req, res) => {
    res.render('login');
};

// Procesar Inicio de Sesión
exports.postLogin = async (req, res) => {
    const { email } = req.body;
    try {
        // Buscamos el usuario en Firebase por su email
        const userRecord = await getAuth().getUserByEmail(email);

        // Renderizamos la vista home pasando los datos del usuario
        res.render('home', { user: { email: userRecord.email, uid: userRecord.uid } });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.render('login', { error: 'Usuario no encontrado o credenciales incorrectas' });
    }
};

// Cerrar sesión
exports.logout = (req, res) => {
    res.redirect('/login');
};