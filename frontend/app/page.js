import HomeContent from "@/components/HomeContent";
import { getHomePageData } from "@/lib/data/homeProducts";

export const dynamic = "force-dynamic";

function firstParam(v) {
  if (v == null) return "";
  if (Array.isArray(v)) return v[0] ?? "";
  return String(v);
}

export default async function Home({ searchParams }) {
  const q = firstParam(searchParams?.q);
  const category = firstParam(searchParams?.category);

  let products = [];
  let categories = [];
  let loadError = null;

  try {
    const data = await getHomePageData(q, category);
    products = data.products;
    categories = data.categories;
  } catch (e) {
    loadError =
      e?.message ||
      "Could not load products. Start the API (backend) and set NEXT_PUBLIC_API_URL in frontend/.env.local.";
  }

  return (
    <HomeContent
      products={products}
      categories={categories}
      q={q}
      category={category}
      loadError={loadError}
    />
  );
}
