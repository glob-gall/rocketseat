// fastify-jwt.d.ts
import "@fastify/jwt"

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { } // payload type is used for signing and verifying
    user: {
      role: 'ADMIN' | 'MEMBER'
      sub: string,
    } // user type is return type of `request.user` object
  }
}

