import React, { useEffect, useState } from "react";
import { category } from "../utils/data";
import HeaderImage from "../utils/Images/Header.png";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductsCard from "../components/cards/ProductsCard";
import { getAllProducts } from "../api";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="px-[20px] md:px-[30px] pb-[200px] h-full overflow-y-scroll flex items-center flex-col gap-[30px] bg-white">
      <div className="max-w-[1400px] py-8 px-4 flex flex-col gap-7">
        <img src={HeaderImage} className="w-full max-w-[1200px]" alt="header" />
      </div>
      <div className="max-w-[1400px] py-8 px-4 flex flex-col gap-7">
        <div className="text-[28px] font-medium flex justify-between items-center">
          Food Categories
        </div>
        <div className="flex flex-wrap gap-8 md:gap-4 justify-center">
          {category.map((category, index) => (
            <ProductCategoryCard key={index} category={category} />
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] py-8 px-4 flex flex-col gap-7">
        <div className="text-[28px] font-medium flex justify-between items-center">
          Most Popular
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="flex flex-wrap gap-8 md:gap-4 justify-center">
            {products.map((product, index) => (
              <ProductsCard key={index} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
