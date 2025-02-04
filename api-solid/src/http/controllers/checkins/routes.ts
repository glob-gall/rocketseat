import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createCheckin } from "./create.controller";
import { validateCheckin } from "./validate.controller";
import { checkinHistory } from "./history.controller";
import { checkinMetrics } from "./metrics.controller";


export async function checkinsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/checkins/history', checkinHistory)
  app.get('/checkins/metrics', checkinMetrics)
  
  app.post('/gyms/:gymId/checkin',createCheckin)
  app.patch('/checkins/:checkinId/validate',validateCheckin)
}
