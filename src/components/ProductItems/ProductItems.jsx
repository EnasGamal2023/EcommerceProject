import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import Styles from "./ProductItems.module.css";
import Image from '../../Images/img2_category.jpg';
function ProductItems({ chosenCategory, products, handleAddToCard }) {
  return ( 
<section className={Styles.container}>
<div className={Styles.card}>
  <div className={Styles.image}>
    <img src={Image} alt=""/>
  </div>
  <div className={Styles.productItems}>
  <p className={Styles.category}>{chosenCategory}</p>
  <div className={Styles.grid}>
    {products.map((product) => (
      <ProductItem
        key={product.id}
        product={product}
        handleAddToCard={handleAddToCard}
      />
    ))}
  </div>
</div>
</div> 
</section>

 
  );
}

export default ProductItems;
