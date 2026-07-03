import { NextResponse } from "next/server";

const DEFAULT_SITE_URL = "https://www.mahedeluxe.ae";
const DEFAULT_API_BASE_URL = "http://localhost:5000/api/v1";
const DEFAULT_SHARE_IMAGE = "/logo.png";

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

type FetchProductResult = {
  ok: boolean;
  status: number;
  requestUrl: string;
  rawText: string;
  product: ProductPayload | null;
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

async function fetchProduct(id: string): Promise<FetchProductResult> {
  const apiBaseUrl = getApiBaseUrl();
  const requestUrl = `${apiBaseUrl}/product/${id}`;

  try {
    const response = await fetch(requestUrl, {
      cache: "no-store",
    });

    const rawText = await response.text();
    let data: ProductResponse | null = null;

    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch {
      data = null;
    }

    return {
      ok: response.ok,
      status: response.status,
      requestUrl,
      rawText,
      product: extractProductPayload(data),
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      requestUrl,
      rawText: error instanceof Error ? error.message : "Unknown fetch error",
      product: null,
    };
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const siteUrl = getSiteUrl();
  const result = await fetchProduct(id);
  const productName = String(result.product?.name || "Product");

  return NextResponse.json({
    id,
    siteUrl,
    apiBaseUrl: getApiBaseUrl(),
    fetchOk: result.ok,
    fetchStatus: result.status,
    fetchUrl: result.requestUrl,
    productFound: Boolean(result.product),
    productName,
    description: buildDescription(result.product),
    shareImage: getShareImage(result.product, siteUrl),
    productImages: normalizeImageList(result.product?.image_url),
    variantImages: Array.isArray(result.product?.size_variants)
      ? result.product.size_variants.flatMap((variant) =>
          normalizeImageList(variant?.image_url),
        )
      : [],
    rawResponsePreview: result.rawText.slice(0, 500),
  });
}
