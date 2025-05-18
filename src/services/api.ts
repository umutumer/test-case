import { Bounce, toast } from "react-toastify";

//Products API

export const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
};


//Cart API

export const fetchCart = async () => {
  const response = await fetch("https://fakestoreapi.com/carts/1");
  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }
  const data = await response.json();
  return data;
};

export const updateCartItemQuantity = async (
  productId: number,
  quantity: number,
  currentCartProducts: { productId: number; quantity: number }[]
) => {
  const updatedProducts = currentCartProducts.map((item) =>
    item.productId === productId
      ? { ...item, quantity: Math.max(1, quantity) }
      : item
  );

  const response = await fetch("https://fakestoreapi.com/carts/1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ products: updatedProducts }),
  });

  if (!response.ok) {
    throw new Error("Failed to update cart");
  }

  return response.json();
};

export const addCartItem = async (
  newProduct: { productId: number; quantity: number },
  currentCartProducts: { productId: number; quantity: number }[]
) => {
  const productExists = currentCartProducts.find(
    (item) => item.productId === newProduct.productId
  );

  let updatedProducts;
  if (productExists) {
    updatedProducts = currentCartProducts.map((item) =>
      item.productId === newProduct.productId
        ? { ...item, quantity: item.quantity + newProduct.quantity }
        : item
    );
  } else {
    updatedProducts = [...currentCartProducts, newProduct];
  }

  const response = await fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ products: updatedProducts }),
  });

  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }

  toast.success("Product successfully added to cart", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
  return response.json();
};

export const deleteCartItem = async (
  productId: number, 
  currentCartProducts: { productId: number; quantity: number }[]
) => {
  const updatedProducts = currentCartProducts.filter(
    (item) => item.productId !== productId
  );

  const response = await fetch("https://fakestoreapi.com/carts/1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ products: updatedProducts }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete cart item");
  }

  toast.success("Product successfully removed from cart", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
  return response.json();
}
