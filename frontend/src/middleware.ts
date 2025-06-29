import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import actions from './actions';
import constants from './consts';

export interface DecodedToken {
  userid: string;
  name: string;
  role: 'ADMIN' | 'OWNER' | 'EMPLOYEE' | 'CLIENT';
  iat: number;
  exp: number;
}

const PUBLIC_ROUTES = [
  '/recuperar-acesso',
  '/cadastro',
  '/access-denied',
  '/login',
];

const AUTH_ROUTES = ['/login', '/recuperar-acesso', '/cadastro'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some((route) => {
    return pathname === route || pathname.startsWith(route + '/');
  });

  const token = req.cookies.get(constants.AUTH_TOKEN_COOKIE_NAME)?.value;

  if (AUTH_ROUTES.includes(pathname) && token) {
    return redirectToHome(req);
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get(
    constants.AUTH_REFRESH_TOKEN_COOKIE_NAME
  )?.value;

  if (!token) {
    if (!refreshToken) {
      return redirectToLogin(req);
    }

    try {
      console.log('Refreshing token...');
      const data = await actions.auth.refreshTokenAction(refreshToken);

      const response = NextResponse.next();
      response.cookies.set(constants.AUTH_TOKEN_COOKIE_NAME, data.token, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 2,
        path: '/',
      });
      response.cookies.set(
        constants.AUTH_REFRESH_TOKEN_COOKIE_NAME,
        data.refresh_token,
        {
          maxAge: 60 * 60 * 24 * 3,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
        }
      );
      return response;
    } catch (error) {
      console.error('Erro ao renovar o token:', error);
      return redirectToLogin(req);
    }
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token!);

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      throw new Error('Token expirado');
    }

    return NextResponse.next();
  } catch (error) {
    console.error(
      'Erro ao decodificar o token ou verificar permissões:',
      error
    );
    return redirectToLogin(req);
  }
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/login';
  return NextResponse.redirect(loginUrl);
}

function redirectToHome(req: NextRequest) {
  const homeUrl = req.nextUrl.clone();
  homeUrl.pathname = '/';
  return NextResponse.redirect(homeUrl);
}

export const config = {
  matcher: ['/((?!api|_next|static|img|favicon.ico).*)'],
};
