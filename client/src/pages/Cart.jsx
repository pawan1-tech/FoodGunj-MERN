import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { addToCart, deleteFromCart, getCart, placeOrder } from "../api";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { DeleteOutline } from "@mui/icons-material";

const Cart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    completeAddress: "",
  });

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("foodGunj-app-token");
    await getCart(token).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const calculateSubtotal = () => {
    return products.reduce(
      (total, item) => total + item.quantity * item?.product?.price?.org,
      0
    );
  };

  const convertAddressToString = (addressObj) => {
    return `${addressObj.firstName} ${addressObj.lastName}, ${addressObj.completeAddress}, ${addressObj.phoneNumber}, ${addressObj.emailAddress}`;
  };

  const PlaceOrder = async () => {
    setButtonLoad(true);
    try {
      const isDeliveryDetailsFilled =
        deliveryDetails.firstName &&
        deliveryDetails.lastName &&
        deliveryDetails.completeAddress &&
        deliveryDetails.phoneNumber &&
        deliveryDetails.emailAddress;

      if (!isDeliveryDetailsFilled) {
        dispatch(
          openSnackbar({
            message: "Please fill in all required delivery details.",
            severity: "error",
          })
        );
        return;
      }

      const token = localStorage.getItem("foodGunj-app-token");
      const totalAmount = calculateSubtotal().toFixed(2);
      const orderDetails = {
        products,
        address: convertAddressToString(deliveryDetails),
        totalAmount,
      };

      await placeOrder(token, orderDetails);
      dispatch(
        openSnackbar({
          message: "Order placed successfully",
          severity: "success",
        })
      );
      setButtonLoad(false);
      setReload(!reload);
    } catch (err) {
      dispatch(
        openSnackbar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        })
      );
      setButtonLoad(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [reload]);

  const addCart = async (id) => {
    const token = localStorage.getItem("foodGunj-app-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const removeCart = async (id, quantity, type) => {
    const token = localStorage.getItem("foodGunj-app-token");
    let qnt = quantity > 0 ? 1 : null;
    if (type === "full") qnt = null;
    await deleteFromCart(token, {
      productId: id,
      quantity: qnt,
    })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  return (
    <div className="px-[20px] md:px-[30px] pb-[200px] h-full overflow-y-scroll flex items-center flex-col gap-[30px] bg-white">
      <div className="w-full max-w-[1400px] py-8 px-4 flex flex-col items-center text-[22px] gap-7">
        <h1 className="text-[28px] font-medium flex justify-between items-center">Your Shopping Cart</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {products.length === 0 ? (
              <div>Cart is empty</div>
            ) : (
              <div className="flex gap-8 w-full p-3 md:flex-col">
                <div className="flex-1 flex flex-col gap-3 md:flex-[1.2]">
                  <div className="text-base flex items-center gap-[30px] mb-[22px]">
                    <div className="flex-1 font-semibold text-lg">Product</div>
                    <div className="font-semibold text-lg">Price</div>
                    <div className="font-semibold text-lg">Quantity</div>
                    <div className="font-semibold text-lg">Subtotal</div>
                    <div></div>
                  </div>

                  {products.map((item) => (
                    <div key={item.product._id} className="text-base flex items-center gap-[30px]">
                      <div className="flex-1">
                        <div className="flex gap-4">
                          <img src={item?.product?.img} alt={item?.product?.name} className="h-20" />
                          <div className="max-w-[130px] md:max-w-[60px]">
                            <div className="text-red-600 text-base font-medium">{item?.product?.name}</div>
                            <div className="text-sm font-normal text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
                              {item?.product?.desc}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>${item?.product?.price?.org}</div>
                      <div>
                        <div className="flex gap-3 items-center border border-gray-400/40 rounded-lg px-3 py-1">
                          <div
                            className="cursor-pointer flex-1"
                            onClick={() => removeCart(item?.product?._id, item?.quantity - 1)}
                          >
                            -
                          </div>
                          {item?.quantity}
                          <div
                            className="cursor-pointer flex-1"
                            onClick={() => addCart(item?.product?._id)}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div>${(item.quantity * item?.product?.price?.org).toFixed(2)}</div>
                      <div>
                        <DeleteOutline
                          sx={{ color: "red" }}
                          onClick={() => removeCart(item?.product?._id, item?.quantity - 1, "full")}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex-1 flex flex-col gap-3 md:flex-[0.8]">
                  <div className="text-[22px] font-semibold flex justify-between">
                    <span>Subtotal :</span> <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>

                  <div className="text-lg font-medium flex flex-col gap-1.5">
                    Delivery Details:
                    <div>
                      <div className="flex gap-1.5">
                        <TextInput
                          small
                          placeholder="First Name"
                          value={deliveryDetails.firstName}
                          handelChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              firstName: e.target.value,
                            })
                          }
                        />
                        <TextInput
                          small
                          placeholder="Last Name"
                          value={deliveryDetails.lastName}
                          handelChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <TextInput
                        small
                        placeholder="Email Address"
                        value={deliveryDetails.emailAddress}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            emailAddress: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        placeholder="Phone no. +91 XXXXX XXXXX"
                        value={deliveryDetails.phoneNumber}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        textArea
                        rows="5"
                        placeholder="Complete Address (Address, State, Country, Pincode)"
                        value={deliveryDetails.completeAddress}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            completeAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="text-lg font-medium flex flex-col gap-1.5">
                    Payment Details:
                    <div>
                      <TextInput small placeholder="Card Number" />
                      <div className="flex gap-1.5">
                        <TextInput small placeholder="Expiry Date" />
                        <TextInput small placeholder="CVV" />
                      </div>
                      <TextInput small placeholder="Card Holder name" />
                    </div>
                  </div>

                  <Button
                    text="Place Order"
                    small
                    onClick={PlaceOrder}
                    isLoading={buttonLoad}
                    isDisabled={buttonLoad}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
