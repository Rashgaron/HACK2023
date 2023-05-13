import express from "express";
import userRoutes from "./user.routes";
import gameRoutes from "./game.routes";
import rankingRoutes from "./ranking.routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger_output.json";

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req: any, res: any) => {
  /**
   * #swagger.tags = ['Status']
   */
  res.send("OK");
});

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

router.use(
  "/users",
  /*
#swagger.tags = ['User']
*/

  userRoutes
);

router.use(
  "/ranking",
  /*
#swagger.tags = ['Ranking']
*/
  rankingRoutes
);

router.use(
  "/game",
  /*
#swagger.tags = ['Game']
*/

  gameRoutes
);

export default router;
