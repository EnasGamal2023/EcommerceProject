import logo from "../../Images/imglogo3.jpg";
import card from "../../Images/empty_cart.png";
import Styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import menuIcon from "../../Images/menu.png";
import closeIcon from "../../Images/close.png";
import CardOverlay from "../CardOverlay/CardOverlay";
export function Header({
  choseCategory,
  chosenCategory,
  totalQuantity,
  totalPrice,
  getTotalQuantity,
  getTotalPrice,
  cardItems,
  incrementQuantity,
  decrementQuantity,
  deleteQuantity,
  completedProcess,
}) {
  const [open, setOpen] = useState(false);
  const [displayCard, setDisplayCard] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    getTotalQuantity();
  }, [cardItems]);

  return (
    <header className={Styles.sticky}>
      <nav className={Styles.flexSpaceBetween}>
        <div onClick={() => setOpen(!open)} className={Styles.display}>
          {open ? (
            <img src={closeIcon} alt="close_icon" />
          ) : (
            <img src={menuIcon} alt="menu_icon" />
          )}
        </div>
        <ul className={`${Styles.flex} ${open && Styles.displayFlex}`}>
          {categories.map((category) => (
            <li key={category}>
              <NavLink
                onClick={() => choseCategory(category)}
                className={category === chosenCategory ? Styles.active : null}
                to="/EcommerceProject"
              >
                {category}
              </NavLink>
            </li>
            
          ))}
        </ul>
        <img className={Styles.logo} src={logo} alt=".." />
        <div className={Styles.itemsCenter}>
          <div className={Styles.relative}>
            <img
              onClick={() => setDisplayCard(!displayCard)}
              src={card}
              alt="Card"
              className={Styles.curserPointer}
            />
            <span className={Styles.span}>{totalQuantity}</span>
            {displayCard && (
              <CardOverlay
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
                getTotalPrice={getTotalPrice}
                cardItems={cardItems}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                deleteQuantity={deleteQuantity}
                completedProcess={completedProcess}
                displayCard={displayCard}
                setDisplayCard={setDisplayCard}
              />
            )}
          </div>
        </div>
      </nav>
      {displayCard && (
        <div
          onClick={() => setDisplayCard(!displayCard)}
          className={Styles.overlay}
        />
      )}
    </header>
  );
}

export default Header;
