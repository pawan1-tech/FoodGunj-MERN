import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import Button from "../components/Button";
import { FavoriteBorderOutlined, FavoriteRounded } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  getProductDetails,
} from "../api";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { useDispatch } from "react-redux";

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();

  const getProduct = useCallback(async () => {
    setLoading(true);
    await getProductDetails(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id]);

  const removeFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("foodGunj-app-token");
    await deleteFromFavourite(token, { productId: id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const addFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("foodGunj-app-token");
    await addToFavourite(token, { productId: id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const checkFavorite = useCallback(async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("foodGunj-app-token");
    await getFavourite(token, { productId: id })
      .then((res) => {
        const isFavorite = res.data?.some((favorite) => favorite._id === id);
        setFavorite(isFavorite);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  }, [id, dispatch]);

  useEffect(() => {
    getProduct();
    checkFavorite();
  }, [getProduct, checkFavorite]);

  const addCart = async () => {
    setCartLoading(true);
    const token = localStorage.getItem("foodGunj-app-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        setCartLoading(false);
        navigate("/cart");
      })
      .catch((err) => {
        setCartLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  return (
    <div className="px-5 md:px-[30px] pb-[200px] h-full overflow-y-scroll flex items-center flex-col gap-[30px] bg-white">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="w-full flex-1 max-w-[1400px] flex gap-10 justify-center md:flex-col md:gap-8">
          <div className="flex-[0.7] flex justify-center">
            <img 
              src={product?.img}
              alt={product?.name}
              className="max-w-[500px] w-full max-h-[500px] rounded-xl object-cover md:max-w-[400px] md:h-[400px]" 
            />
          </div>
          <div className="flex-1 flex gap-[18px] flex-col p-1 px-2.5">
            <h1 className="text-[28px] font-semibold text-gray-800">{product?.name}</h1>
            <Rating value={3.5} />
            <div className="flex items-center gap-2 text-[22px] font-medium text-gray-800">
              ₹{product?.price?.org} 
              <span className="text-base font-medium text-gray-400/60 line-through">₹{product?.price?.mrp}</span>
              <span className="text-base font-medium text-green-600">(₹{product?.price?.off}% Off)</span>
            </div>

            <p className="text-base font-normal text-gray-800">{product?.desc}</p>

            <div className="text-base font-medium">
              <div>Ingredients</div>
              <div className="flex flex-wrap gap-3">
                {product?.ingredients.map((ingredient, index) => (
                  <span 
                    key={index}
                    className="bg-red-600/20 text-red-600 text-sm py-1 px-3 rounded-xl flex items-center justify-center"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 py-8 md:py-3">
              <Button
                text="Add to Cart"
                full
                outlined
                isLoading={cartLoading}
                onClick={() => addCart()}
              />
              <Button text="Order Now" full />
              <Button
                leftIcon={
                  favorite ? (
                    <FavoriteRounded sx={{ fontSize: "22px", color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlined sx={{ fontSize: "22px" }} />
                  )
                }
                full
                outlined
                isLoading={favoriteLoading}
                onClick={() => (favorite ? removeFavourite() : addFavourite())}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
