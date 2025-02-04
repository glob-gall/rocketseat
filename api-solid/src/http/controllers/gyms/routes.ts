import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { searchGym } from "./search.controller";
import { fetchNearbyGyms } from "./nearby.controller";
import { createGym } from "./create.controller";
import { VerifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchGym)
  app.get('/gyms/nearby', fetchNearbyGyms)

  app.post('/gyms', {onRequest: [VerifyUserRole('ADMIN')]}, createGym)
}
