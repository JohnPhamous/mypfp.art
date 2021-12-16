import axios from "axios";
import { useQuery } from "react-query";

interface Asset {
  description: string;
  image_original_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  is_presale: boolean;
  name: string;
  permalink: string;
  token_id: number;
  num_sales: number;
  asset_contract: {
    name: string;
  };
}

interface OpenSeaResponse {
  assets: Asset[];
}

/**
 * This is the max as specified by OpenSea.
 */
const PAGE_SIZE = 50;

const getNFTs = async (walletAddress: string): Promise<OpenSeaResponse> => {
  const assets: Asset[] = [];
  let offset = 0;

  while (true) {
    const res = await axios.get(
      `https://api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&offset=${offset}&limit=${PAGE_SIZE}`
    );

    if (res.data.assets.length === 0) {
      break;
    }

    offset += res.data.assets.length;
    assets.push(...res.data.assets);

    if (offset < PAGE_SIZE) {
      break;
    }
  }

  return { assets };
};

export default function useGetNFTs(walletAddress: string) {
  return useQuery("nfts", () => getNFTs(walletAddress), {
    keepPreviousData: true,
  });
}
