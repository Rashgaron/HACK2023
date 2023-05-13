import { Request, Response } from "express";
import productsService from "../services/products.service";
import httpStatus from "http-status";

const { getProductDB, getProductsDB, initProductsDB, buyProductDB } =
  productsService;

const productsController = () => {
  const getProducts = async (req: Request, res: Response) => {
    try {
      const products = await getProductsDB();
      res.status(httpStatus.OK).json(products);
    } catch (error) {
      console.log(error);
    }
  };

  const buyProduct = async (req: Request, res: Response) => {
    try {
      const { productId, userId } = req.body;
      const bought = await buyProductDB(productId, userId);
      if (bought) res.status(httpStatus.OK).json({ message: "Product bought" });
      else
        res.status(httpStatus.CONFLICT).json({ message: "Not enough coins" });
    } catch (error) {
      console.log(error);
    }
  };

  const initProducts = async (req: Request, res: Response) => {
    try {
      await initProductsDB();
      res.status(httpStatus.OK).json({ message: "Products initialized" });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getProducts,
    buyProduct,
    initProducts,
  };
};

export default productsController();
