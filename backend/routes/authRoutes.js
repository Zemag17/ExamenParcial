// backend/routes/authRoutes.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

// Inicia el login con Google (redirección a Google)
router.get('/', (req, res) => {
  const redirectUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

  redirectUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID);
  redirectUrl.searchParams.set('redirect_uri', process.env.GOOGLE_CALLBACK_URL);
  redirectUrl.searchParams.set('response_type', 'code');
  redirectUrl.searchParams.set('scope', 'openid email profile');
  redirectUrl.searchParams.set('access_type', 'offline');
  redirectUrl.searchParams.set('prompt', 'consent');

  return res.redirect(redirectUrl.toString());
});

// Callback de Google: aquí llega ?code=...
router.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Falta el parámetro "code"');
  }

  try {
    // Intercambiamos el "code" por tokens en Google
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: 'authorization_code',
    });

    const { id_token, access_token } = tokenRes.data;

    // 👇 Para el examen puedes simplificar:
    // lo normal sería verificar el token, buscar/crear usuario en MongoDB, etc.
    // De momento, te redirijo al frontend con el token en la query.
    const frontendUrl = process.env.FRONTEND_URL || 'https://TU-FRONT.vercel.app';

    return res.redirect(`${frontendUrl}/login-success?token=${id_token}`);
  } catch (err) {
    console.error('Error intercambiando el code por tokens:', err.response?.data || err.message);
    return res.status(500).send('Error al autenticar con Google');
  }
});

module.exports = router;
