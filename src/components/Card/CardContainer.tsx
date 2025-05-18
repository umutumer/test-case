import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../../types/types";
import "./CardContainer.scss";
import { StarRate } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useCartStore } from "../../store/cartSrote";

interface CardContainerProps {
  product: Product;
}


const CardContainer: React.FC<CardContainerProps> = ({ product }) => {

  const {addItemToCart} = useCartStore();
  const handleAddToCart = () => {
    const cart={
      productId: product.id,
      quantity: 1,}
    addItemToCart(cart);
  };

  return (
    <Card className="card-container">
      <CardMedia
        component="img"
        alt={product.title}
        height="250"
        image={product.image}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="card-title"
        >
          {product.title.length > 40
            ? product.title.slice(0, 40) + "..."
            : product.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          className="category-rating"
        >
          <p className="category-rating-text">
            {" "}
            <span className="category-text">{product.category}</span> {" | "}{" "}
            {product.rating.rate} <StarRate className="star-icon" />
            <span className="rating-count">({product.rating.count})</span>
          </p>
        </Typography>
        <Typography variant="h6" color={green[500]}>
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={handleAddToCart}>
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardContainer;
