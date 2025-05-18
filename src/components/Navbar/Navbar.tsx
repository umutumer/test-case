import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Drawer } from "@mui/material";
import "./Navbar.scss";
import { useCartStore } from "../../store/cartSrote";
import { useProductStore } from "../../store/productStore";
import { useEffect, useState } from "react";
import {
  AddCircleOutline,
  DeleteOutline,
  RemoveCircleOutline,
} from "@mui/icons-material";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { cart, loading, error, getCart, updateQuantity, removeItemFromCart } =
    useCartStore();
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    getCart();
    getProducts();
  }, []);

  const toggleCartDrawer = (newOpen: boolean) => {
    setCartDrawerOpen(newOpen);
  };

  const totalCartQuantity =
    cart?.products.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const totalPrice =
    cart?.products.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0) || 0;

  return (
    <header>
      <nav className="navbar">
        <p className="logo">
          E-COMMERCE <span>APP</span>
        </p>

        <Button
          onClick={() => toggleCartDrawer(true)}
          style={{ marginRight: 20 }}
        >
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={totalCartQuantity} color="primary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Button>

        <Drawer
          anchor="right"
          open={cartDrawerOpen}
          onClose={() => toggleCartDrawer(false)}
        >
          <div style={{ width: 350, padding: 16 }}>
            <h2 style={{ marginBottom: 20 }}>My Cart</h2>
            {cart && cart.products.length > 0 ? (
              cart.products
                .slice()
                .reverse()
                .map((item, index) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={index}
                      style={{ display: "flex", gap: 8, marginBottom: 16 }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: 60, height: 60, objectFit: "contain" }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0 }}>{product.title}</h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                          >
                            <RemoveCircleOutline fontSize="small" />
                          </IconButton>
                          <span>{item.quantity}</span>
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                          >
                            <AddCircleOutline fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => removeItemFromCart(item.productId)}
                            style={{ marginLeft: "auto" }}
                          >
                            <DeleteOutline fontSize="small" color="error" />
                          </IconButton>
                        </div>
                        <p style={{ margin: 0, fontWeight: "bold" }}>
                          ${(product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div style={{ textAlign: "center", marginTop: 50 }}>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <p>{error || "No items in cart"}</p>
                )}
              </div>
            )}
            {cart && cart.products.length > 0 && (
              <div style={{ marginTop: 50, fontWeight: "bold" }}>
                Total Price: ${totalPrice.toFixed(2)}
              </div>
            )}
          </div>
        </Drawer>
      </nav>
    </header>
  );
};

export default Navbar;
