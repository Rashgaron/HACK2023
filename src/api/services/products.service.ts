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
    title: "#668822",
    description: "Description 1",
    image_url: "https://picsum.photos/200/300",
    price: 100,
  },
  {
    title: "#112255",
    description: "Description 2",
    image_url: "https://picsum.photos/200/300",
    price: 200,
  },
];

export default productsService();
