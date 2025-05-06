import React, { useEffect, useState, useCallback } from "react";
import ProductsCard from "../components/cards/ProductsCard";
import { getFavourite } from "../api";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("foodGunj-app-token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const res = await getFavourite(token);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
      setError(err.message || "Failed to fetch favorites");
      dispatch(
        openSnackbar({
          message: err.message || "Failed to fetch favorites",
          severity: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="px-[20px] md:px-[30px] pb-[200px] h-full overflow-y-scroll flex items-center flex-col gap-[30px] bg-white">
      <div className="max-w-[1400px] py-8 px-4 flex flex-col gap-7">
        <h1 className="text-[28px] font-medium">Your Favourites</h1>
        <div className="flex flex-wrap gap-8 md:gap-4 justify-center">
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              {products.map((product) => (
                <ProductsCard key={product._id} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
