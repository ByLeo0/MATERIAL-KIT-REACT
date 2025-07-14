"use client"

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  globalThis.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Pablo',
  lastName: 'de los Backyardigans',
  email: 'pablo@google.com',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
  const { email, password } = params;

  try {
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        contraseña: password, // importante: el backend espera "contraseña", no "password"
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return { error: data.message || 'Error en el inicio de sesión' };
    }

    // Guardar token y nombre en localStorage
    localStorage.setItem('custom-auth-token', data.token);
    localStorage.setItem('user-name', data.nombre);

    return {};
  } catch (error) {
    return { error: 'Error al conectar con el servidor' };
  }
}


async getUser(): Promise<{ data?: User | null; error?: string }> {
  const token = localStorage.getItem('custom-auth-token');

  if (!token) {
    return { data: null };
  }

  try {
    const res = await fetch('http://localhost:8080/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !data.success || !data.usuario) {
      return { data: null };
    }

    return {
      data: {
        id: data.usuario.idUsuario.toString(),
        firstName: data.usuario.nombre,  // Aquí uso nombre del DTO
        lastName: '',                    // No tienes apellido en el DTO, lo dejas vacío
        email: data.usuario.email,
        avatar: '/assets/avatar.png',
      } satisfies User,
    };
  } catch (error) {
    return { error: 'Error al validar el token' };
  }
}


  async signOut(): Promise<{ error?: string }> {
const token = localStorage.getItem('custom-auth-token');

  if (!token) {
    return {};
  }

  try {
    const res = await fetch('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenSesion: token }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return { error: data.message || 'Error al cerrar sesión' };
    }

    localStorage.removeItem('custom-auth-token');
    localStorage.removeItem('user-name');
    return {};
  } catch (err) {
    return { error: 'Error al conectar con el servidor' };
  }
  }

  // Mantén los otros métodos igual o implementa según tu backend
}

export const authClient = new AuthClient();
