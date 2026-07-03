import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

const DEFAULT_SITE_URL = "https://www.mahedeluxe.ae";
const DEFAULT_API_BASE_URL = "http://localhost:5000/api/v1";
const DEFAULT_SHARE_IMAGE = "/logo.png";

type ProductRouteParams = {
  params: Promise<{ id: string }>;
};

type ProductPayload = {
  id?: string | number;
  name?: string | null;
  description?: string | null;
  image_url?: string | string[] | null;
  size_variants?: Array<{
    image_url?: string | string[] | null;
  }> | null;
};

type ProductResponse =
  | ProductPayload
  | {
      data?: ProductPayload;
      product?: ProductPayload;
    };

function getSiteUrl() {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    DEFAULT_SITE_URL;
  return value.replace(/\/$/, "");
}

function getApiBaseUrl() {
  const value =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    DEFAULT_API_BASE_URL;
  return value.replace(/\/$/, "");
}

function normalizeImageList(value: string | string[] | null | undefined) {
  if (Array.isArray(value)) {
    return value
      .map((image) => String(image || "").trim())
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return [value.trim()];
  }

  return [];
}

function toAbsoluteUrl(value: string, baseUrl: string) {
  try {
    return new URL(value, `${baseUrl}/`).toString();
  } catch {
    return null;
  }
}

function getShareImage(product: ProductPayload | null, siteUrl: string) {
  if (!product) {
    return toAbsoluteUrl(DEFAULT_SHARE_IMAGE, siteUrl);
  }

  const variantImages = Array.isArray(product.size_variants)
    ? product.size_variants.flatMap((variant) =>
        normalizeImageList(variant?.image_url),
      )
    : [];
  const productImages = normalizeImageList(product.image_url);
  const firstImage = [...variantImages, ...productImages].find(Boolean);

  return firstImage
    ? toAbsoluteUrl(firstImage, siteUrl)
    : toAbsoluteUrl(DEFAULT_SHARE_IMAGE, siteUrl);
}

function buildDescription(product: ProductPayload | null) {
  const rawDescription = String(product?.description || "").trim();
  if (rawDescription.length > 0) {
    return rawDescription.slice(0, 160);
  }

  return "Source products from verified vendors worldwide on MaheDeluxe.";
}

function isWrappedProductResponse(
  payload: ProductResponse,
): payload is { data?: ProductPayload; product?: ProductPayload } {
  return "data" in payload || "product" in payload;
}

function extractProductPayload(payload: ProductResponse | null) {
  if (!payload) return null;

  if (isWrappedProductResponse(payload)) {
    if (payload.data) {
      return payload.data;
    }

    if (payload.product) {
      return payload.product;
    }

    return null;
  }

  return payload;
}

async function fetchProduct(id: string) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/product/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as ProductResponse;

    return extractProductPayload(data);
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: ProductRouteParams,
): Promise<Metadata> {
  const { id } = await params;
  const siteUrl = getSiteUrl();
  const product = await fetchProduct(id);
  const productName = String(product?.name || "Product");
  const description = buildDescription(product);
  const pageUrl = `${siteUrl}/products/${id}`;
  const shareImage = getShareImage(product, siteUrl);

  return {
    title: product ? `${productName} | MaheDeluxe` : "MaheDeluxe Product",
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: product ? `${productName} | MaheDeluxe` : "MaheDeluxe Product",
      description,
      url: pageUrl,
      siteName: "MaheDeluxe",
      type: "website",
      images: shareImage
        ? [
            {
              url: shareImage,
              alt: product ? productName : "MaheDeluxe",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product ? `${productName} | MaheDeluxe` : "MaheDeluxe Product",
      description,
      images: shareImage ? [shareImage] : undefined,
    },
  };
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
