import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "../components/cards/ProductsCard";
import { filter } from "../utils/data";
import { CircularProgress, Slider } from "@mui/material";
import { getAllProducts } from "../api";

const FoodListing = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const getFilteredProductsData = useCallback(async () => {
    setLoading(true);
    await getAllProducts(
      selectedCategories.length > 0
        ? `minPrice=${priceRange[0]}&maxPrice=${
            priceRange[1]
          }&categories=${selectedCategories.join(",")}`
        : `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
    ).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, [selectedCategories, priceRange]);

  useEffect(() => {
    getFilteredProductsData();
  }, [getFilteredProductsData]);

  return (
    <div className="px-5 md:px-[30px] pb-[200px] h-full overflow-y-scroll flex flex-row items-center gap-[30px] bg-white md:flex-col">
      <div className="p-5 px-4 flex-1 w-full max-w-[300px] md:max-w-[440px]">
        <div className="flex flex-col gap-1">
          {filter.map((filters, index) => (
            <div key={index} className="flex flex-col gap-4 p-3">
              <h2 className="text-xl font-medium">{filters.name}</h2>
              {filters.value === "price" ? (
                <Slider
                  aria-label="Price"
                  defaultValue={priceRange}
                  min={0}
                  max={1000}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: "$0" },
                    { value: 1000, label: "$1000" },
                  ]}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                />
              ) : filters.value === "category" ? (
                <div className="flex flex-wrap gap-2.5">
                  {filters.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`cursor-pointer flex border rounded-lg px-2 py-0.5 text-base w-fit transition-all
                        ${
                          selectedCategories.includes(item)
                            ? "border-gray-800 text-gray-800 bg-gray-800/30 font-medium"
                            : "border-gray-400/50 text-gray-400/90"
                        }`}
                      onClick={() =>
                        setSelectedCategories((prevCategories) =>
                          prevCategories.includes(item)
                            ? prevCategories.filter(
                                (category) => category !== item
                              )
                            : [...prevCategories, item]
                        )
                      }
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 py-5">
        <div className="flex flex-wrap gap-8 md:gap-4 justify-center">
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodListing;
