import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import ProductsCard from "../components/cards/ProductsCard";
import { getFavourite } from "../api";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;
const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  @media (max-width: 760px) {
    gap: 16px;
  }
`;
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
    <Container>
      <Section>
        <Title>Your Favourites</Title>
        <CardWrapper>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              {products.map((product) => (
                <ProductsCard product={product} />
              ))}
            </>
          )}
        </CardWrapper>
      </Section>
    </Container>
  );
};

export default Favourites;
