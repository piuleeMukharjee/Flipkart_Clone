/**
 * Server-only: load categories + products from the REST API (which reads PostgreSQL).
 * Avoids bundling @prisma/client in Next.js — run `npm install` in `frontend/` and set NEXT_PUBLIC_API_URL.
 */
function apiBase() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url || typeof url !== "string") {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Add it to frontend/.env.local (e.g. http://localhost:4000/api)"
    );
  }
  return url.replace(/\/$/, "");
}

export async function getHomePageData(search, categoryIdRaw) {
  const searchTrim = (search || "").trim();
  const params = new URLSearchParams();
  if (searchTrim) params.set("search", searchTrim);
  if (categoryIdRaw !== undefined && categoryIdRaw !== "") {
    params.set("category", String(categoryIdRaw));
  }
  const query = params.toString();

  const [prodRes, catRes] = await Promise.all([
    fetch(`${apiBase()}/products${query ? `?${query}` : ""}`, {
      cache: "no-store",
    }),
    fetch(`${apiBase()}/categories`, { cache: "no-store" }),
  ]);

  if (!prodRes.ok) {
    throw new Error(`Products request failed (${prodRes.status})`);
  }
  if (!catRes.ok) {
    throw new Error(`Categories request failed (${catRes.status})`);
  }

  const prodJson = await prodRes.json();
  const catJson = await catRes.json();

  return {
    products: prodJson.data ?? [],
    categories: catJson.data ?? [],
  };
}
