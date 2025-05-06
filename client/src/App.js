import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useState } from "react";
import Authentication from "./pages/Authentication";
import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";
import FoodDetails from "./pages/FoodDetails";
import FoodListing from "./pages/FoodListing";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar
          setOpenAuth={setOpenAuth}
          openAuth={openAuth}
          currentUser={currentUser}
        />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/favorite" exact element={<Favourites />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/dishes/:id" exact element={<FoodDetails />} />
          <Route path="/dishes" exact element={<FoodListing />} />
        </Routes>
        {openAuth && (
          <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
