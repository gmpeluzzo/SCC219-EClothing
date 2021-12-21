import { useContext, useState } from "react"
import { simpleStyles as Styles, AddToCartButton, Container, Product, ProductDetailsDiv, Sizes, SizeButton } from "./styles"
import { Link } from 'react-router-dom';
import ShopContext from "../Context/shop-context";

const ProductDetails = ({productId}) => {
  const { addProductToCart, cart, products } = useContext(ShopContext)
  const product = products[productId];
  const productInCart = cart.find(e => e.id === product.id)
  const isInStock = productInCart? product?.stock > productInCart.quantity : product?.stock > 0

  const [selectedSize, setSelectedSize] = useState("P")

  const addToCartHandler = () => {
    addProductToCart({...product, size: selectedSize})
  }

  return (
    <Container>
      <Product>
        <img src={product?.image} alt="roupa7" style={Styles.productImg}/>
        <ProductDetailsDiv>
          <h2 style={Styles.nameH2}>{product?.name}</h2>
          <p style={Styles.priceParagraph}>{product?.price}</p>
          <p style={Styles.secondParagraph}>Size</p>
          <Sizes>
            <SizeButton selected={selectedSize === "P"} onClick={() => setSelectedSize("P")}>P</SizeButton>
            <SizeButton selected={selectedSize === "M"} onClick={() => setSelectedSize("M")}>M</SizeButton>
            <SizeButton selected={selectedSize === "G"} onClick={() => setSelectedSize("G")}>G</SizeButton>
          </Sizes>
          <p style={Styles.thirdParagraph}>{product?.description}</p>
          <Link to={'/product/checkout'}>
            <AddToCartButton disabled={!isInStock} style={{backgroundColor: isInStock || ('silver')}} onClick={addToCartHandler}>{isInStock? 'Add to Cart' : 'Unavailable'}</AddToCartButton>
          </Link>
        </ProductDetailsDiv>
      </Product>
    </Container>
  )
}

export default ProductDetails