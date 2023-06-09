import Products from "../models/articles.model";
import { IArticle } from "../models/interfaces/IArticle";
import { IUser } from "../models/interfaces/IUser";
import Users from "../models/user.model";

const productsService = () => {
  const buyProductDB = async (productId: number, userId: number) => {
    const product = (await Products.findById(productId)) as IArticle;
    const user = (await Users.findById(userId)) as IUser;
    const { coins } = user;
    const { price } = product;
    if (coins >= price) {
      await Users.findByIdAndUpdate(userId, {
        coins: coins - price,
        $push: { products: product },
      });
      return coins - price;
    }
    return -1;
  };

  const getProductsDB = async () => {
    const dbProducts = await Products.find();
    return dbProducts;
  };

  const getProductDB = async (id: number) => {
    const product = await Products.findOne({ id });
    return product;
  };

  const initProductsDB = async () => {
    await Products.deleteMany({});
    const users = await Users.find();
    await Promise.all(
      users.map(async (user) => {
        await Users.findByIdAndUpdate(user.id, {
          products: [],
        });
      })
    );
    await Products.insertMany(products);
  };

  return {
    getProductsDB,
    getProductDB,
    initProductsDB,
    buyProductDB,
  };
};

const products = [
  {
    title: "FF5732",
    description: "Salmon",
    image_url: "https://picsum.photos/200/300",
    price: 100,
  },
  {
    title: "FFE533",
    description: "Yellow",
    image_url: "https://picsum.photos/200/300",
    price: 200,
  },
  {
    title: "B5FF33",
    description: "Green",
    image_url: "https://picsum.photos/200/300",
    price: 200,
  },
  {
    title: "FD33FF",
    description: "Violet",
    image_url: "https://picsum.photos/200/300",
    price: 200,
  },
{
    title: "FFFFFF",
    description: "White",
    image_url: "https://picsum.photos/200/300",
    price: 0,
    _id: "646006967e0eb5793b0e2e4a"
  },
];

export default productsService();
