// Servicio de autenticación — lógica del login
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import * as authRepository from '../repositories/authRepository.js';

const login = async (nombre_usuario, contrasenia) => {
  // 1. Buscamos el usuario en la DB
  const usuario = await authRepository.buscarPorUsuario(nombre_usuario);

  if (!usuario) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  let coincide = false;

  // Compara la contraseña: bcrypt -> SHA-256 -> texto plano
  try {
    coincide = await bcrypt.compare(contrasenia, usuario.contrasenia);
  } catch {
    coincide = false;
  }

  
  if (!coincide) {
    const hashSHA256 = crypto.createHash('sha256').update(contrasenia).digest('hex');
    coincide = (hashSHA256 === usuario.contrasenia);
  }


  if (!coincide) {
    coincide = contrasenia === usuario.contrasenia;
  }

  if (!coincide) {
    throw new Error('Usuario o contraseña incorrectos');
  }

    // Arma y firma el token JWT
  const payload = {
    id_usuario:     usuario.id_usuario,
    nombre_usuario: usuario.nombre_usuario,
    nombre:         usuario.nombre,
    apellido:       usuario.apellido,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

  return { token, usuario: payload };
};

export { login };
