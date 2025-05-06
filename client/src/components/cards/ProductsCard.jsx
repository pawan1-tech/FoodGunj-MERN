import React, { useEffect, useState, useCallback } from "react";
import { CircularProgress, Rating } from "@mui/material";
import {
  FavoriteBorder,
  FavoriteRounded,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  addToCart,
} from "../../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";
import { updateUser } from "../../redux/reducers/UserSlice";

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const addFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("foodGunj-app-token");
    await addToFavourite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        console.log(err);
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };

  const removeFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("foodGunj-app-token");
    await deleteFromFavourite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };

  const checkFavorite = useCallback(async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("foodGunj-app-token");
    await getFavourite(token, { productId: product?._id })
      .then((res) => {
        const isFavorite = res.data?.some(
          (favorite) => favorite._id === product?._id
        );
        setFavorite(isFavorite);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  }, [dispatch, product?._id]);

  const addCart = async (id) => {
    setCartLoading(true);
    const token = localStorage.getItem("foodGunj-app-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        dispatch(updateUser({ user: res.data.user }));
        setCartLoading(false);
        navigate("/cart");
      })
      .catch((err) => {
        setCartLoading(false);
        dispatch(
          openSnackbar({
            message: err.response?.data?.message || err.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    checkFavorite();
  }, [checkFavorite, product?._id]);

  return (
    <div className="w-[300px] md:w-[180px] flex flex-col gap-4 transition-all duration-300 cursor-pointer">
      <div className="relative flex items-center justify-center rounded-md transition-all duration-300 hover:bg-black group">
        <img 
          src={product?.img}
          alt={product?.name}
          className="w-full h-[300px] md:h-[180px] rounded-md object-cover transition-all duration-300 group-hover:opacity-90"
        />
        <div className="absolute z-10 top-3.5 right-3.5 hidden flex-col gap-3 group-hover:flex">
          <div 
            className="rounded-full w-[35px] h-[35px] bg-white p-2 flex items-center justify-center z-50"
            onClick={() => (favorite ? removeFavourite() : addFavourite())}
          >
            {favoriteLoading ? (
              <CircularProgress sx={{ fontSize: "22px" }} />
            ) : (
              favorite ? (
                <FavoriteRounded sx={{ fontSize: "22px", color: "red" }} />
              ) : (
                <FavoriteBorder sx={{ fontSize: "22px" }} />
              )
            )}
          </div>
          <div 
            className="rounded-full w-[35px] h-[35px] bg-white p-2 flex items-center justify-center z-50"
            onClick={() => addCart(product?._id)}
          >
            {cartLoading ? (
              <CircularProgress sx={{ fontSize: "22px" }} />
            ) : (
              <ShoppingBagOutlined sx={{ fontSize: "22px" }} />
            )}
          </div>
        </div>
        <div className="absolute z-10 bottom-2 left-2 px-2 py-1 rounded bg-white/90 flex items-center">
          <Rating value={3.5} sx={{ fontSize: "14px" }} />
        </div>
      </div>
      <div 
        className="flex flex-col gap-1 px-2.5"
        onClick={() => navigate(`/dishes/${product._id}`)}
      >
        <div className="text-base font-bold text-gray-800">{product?.name}</div>
        <div className="text-base text-gray-800 line-clamp-2">{product?.desc}</div>
        <div className="flex items-center gap-2 text-lg font-medium text-gray-800">
          Rs.{product?.price?.org} 
          <span className="text-sm font-medium text-gray-500 line-through">${product?.price?.mrp}</span>
          <span className="text-xs font-medium text-green-600">({product?.price?.off}% Off)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
