import React from "react";
import useGetNFTs from "../hooks/api/useNFTs";
import { styled } from "../theme/stitches.config";

interface Props {
  walletAddress: string;
}

const NFTPicker = ({ walletAddress }: Props) => {
  const { data, isLoading } = useGetNFTs(walletAddress);

  return (
    <div>
      {isLoading ? (
        <>
          <h2>Loading</h2>
        </>
      ) : (
        <NFTContainer>
          {data?.assets.map((asset) => (
            <NFT
              key={`${asset.image_original_url}-${asset.image_preview_url}-${asset.permalink}`}
            >
              <ImageContainer>
                <Image src={asset.image_preview_url} alt="" />
              </ImageContainer>
              <div>
                <p>{asset.asset_contract.name}</p>
                <h2>{asset.name}</h2>
                {/* <p>{asset.}</p> */}
              </div>
            </NFT>
          ))}
        </NFTContainer>
      )}
    </div>
  );
};

export default NFTPicker;

const NFTContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "$3",
  padding: "$5",
});

const NFT = styled("div", {});

const ImageContainer = styled("div", {
  height: "300px",
  overflow: "hidden",
});

const Image = styled("img", {
  width: "100%",
  objectFit: "contain",
});
