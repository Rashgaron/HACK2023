import express from "express";
import ProductController from "../../controllers/products.controller";

const { buyProduct, getProducts, initProducts } = ProductController;
const router = express.Router();

router
  .route("/")
  .get(
    /*
#swagger.description = 'Endpoint para obtener todos los productos'
    */
    getProducts
  )
  .post(
    /*
#swagger.description = 'Endpoint que reinicia la bd de productos a default'
    */

    initProducts
  );

router.route("/buy").post(
  /*
#swagger.description = 'Endpoint para comprar un producto'
    */

  buyProduct
);

export default router;
