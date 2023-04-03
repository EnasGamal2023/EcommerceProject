import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";


import ProductItems from "./components/ProductItems/ProductItems";
import Bag from "./pages/Bag/Bag";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function App() {
  const [products, setProducts] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("electronics");
  const [cardItems, setCardItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${chosenCategory}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [chosenCategory]);

  const choseCategory = (name) => {
    setChosenCategory(name);
  };

  const handleAddToCard = (p) => {
    let isPresent =
      cardItems.findIndex((product) => product.id === p.id) !== -1;
    if (isPresent) {
      incrementQuantity(p.id);
    } else {
      setCardItems([...cardItems, { ...p, quantity: 1 }]);
    }
  };

  const incrementQuantity = (id) => {
    let updatedCardItems = cardItems.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    setCardItems(updatedCardItems);
  };


  const deleteQuantity = (id) => {
    let updatedCardItems = cardItems.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: 0,
        };
      }
      return product;
    })

     .filter((product) => product?.quantity > 0);
    setCardItems(updatedCardItems);
  };


  const decrementQuantity = (id) => {
    let updatedCardItems = cardItems
      .map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      })
      .filter((product) => product?.quantity > 0);
    setCardItems(updatedCardItems);
  };

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    setTotalQuantity(totalQuantity);
    cardItems?.forEach((product) => {
      totalQuantity += product.quantity;
      setTotalQuantity(totalQuantity);
    });
  };

  const getTotalPrice = () => {
    let sum = 0;
    setTotalPrice(sum);
    cardItems?.forEach((product) => {
      sum += product.price * product.quantity;
      setTotalPrice(sum.toFixed(2));
    });
  };

  const completedProcess = () => {
    if (cardItems.length > 0) {
      alert(
        `Congratulations! You paid: $${totalPrice}. Your order is on its way...`
      );
      setCardItems([]);
    } else {
      alert("Your cart is empty");
    }
  };

  if (!products) {
    <div>Loading...</div>;
  }

  return (
    <div>
      <Header
        choseCategory={choseCategory}
        chosenCategory={chosenCategory}
        getTotalQuantity={getTotalQuantity}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        getTotalPrice={getTotalPrice}
        cardItems={cardItems}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        deleteQuantity={deleteQuantity}
        completedProcess={completedProcess}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProductItems
              chosenCategory={chosenCategory}
              products={products}
              handleAddToCard={handleAddToCard}
            />
          }
        />
        <Route
          path="/products/:id"
          element={<ProductDetails handleAddToCard={handleAddToCard} />}
        />
        <Route
          path="/bag"
          element={
            <Bag
              cardItems={cardItems}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
              completedProcess={completedProcess}
              getTotalQuantity={getTotalQuantity}
              getTotalPrice={getTotalPrice}
              deleteQuantity={deleteQuantity}
            />
          }
        />
      </Routes>
      

    </div>
  );
}

export default App;
