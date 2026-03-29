const base = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }
  return url.replace(/\/$/, "");
};

async function request(path, options = {}) {
  const res = await fetch(`${base()}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: options.cache ?? "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || res.statusText || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function getProducts(search = "", category = "") {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category !== "" && category != null) params.set("category", String(category));
  const q = params.toString();
  return request(`/products${q ? `?${q}` : ""}`);
}

export async function getProductById(id) {
  return request(`/products/${id}`);
}

export async function getCategories() {
  return request("/categories");
}

export async function getCart() {
  return request("/cart");
}

export async function addToCart(productId, quantity = 1) {
  return request("/cart/add", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function updateCartItem(cartItemId, quantity) {
  return request("/cart/update", {
    method: "PUT",
    body: JSON.stringify({ cartItemId, quantity }),
  });
}

export async function removeCartItem(itemId) {
  return request(`/cart/remove/${itemId}`, {
    method: "DELETE",
  });
}

export async function placeOrder(addressId) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify({ addressId }),
  });
}

export async function getAddresses() {
  return request("/address");
}

export async function addAddress(data) {
  return request("/address", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getOrders() {
  return request("/orders");
}

export async function getOrderById(id) {
  return request(`/orders/${id}`);
}
