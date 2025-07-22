export type RankType = "MANY_WISH" | "MANY_RECEIVE" | "MANY_WISH_RECEIVE";
export type TargetType = "ALL" | "FEMALE" | "MALE" | "TEEN";

export interface RankingRequestParams {
  targetType?: TargetType | string;
  rankType?: RankType;
}

export type cardItemData = {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

export interface CommonCardItem {
  id: number;
  imageUrl: string;
  brand: string;
  name: string;
  price: number;
}

export interface ProductDetailDataDto {
  data: cardItemData[];
}

export interface ProductSummaryRequest {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export interface ProductSummaryResponse {
  data: ProductSummaryRequest;
}
