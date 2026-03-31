import type { Metadata } from "next";
import { HomeClient } from "@/components/HomeClient";
import { decodeShareURL, shareDataToConfig } from "@/lib/share";
import { SITE_NAME } from "@/lib/site";
import { defaultConfig } from "@/lib/storage";

type SearchParamValue = string | string[] | undefined;

interface PageProps {
  searchParams?: Promise<Record<string, SearchParamValue>>;
}

function toURLSearchParams(
  searchParams: Record<string, SearchParamValue> | undefined,
) {
  const params = new URLSearchParams();

  if (!searchParams) return params;

  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      params.set(key, value);
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, item);
      }
    }
  }

  return params;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = toURLSearchParams(await searchParams);
  const isSharedView = decodeShareURL(params) !== null;

  if (!isSharedView) {
    return {};
  }

  return {
    title: `${SITE_NAME} — Vista compartida`,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const params = toURLSearchParams(await searchParams);
  const shareData = decodeShareURL(params);
  const sharedConfig = shareData ? shareDataToConfig(shareData) : null;

  return (
    <HomeClient
      initialConfig={sharedConfig ?? defaultConfig}
      initialSharedConfig={sharedConfig}
      showSeoContent={!sharedConfig}
    />
  );
}
