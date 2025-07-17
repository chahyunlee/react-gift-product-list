export type RankType = "MANY_WISH" | "MANY_RECEIVE" | "MANY_WISH_RECEIVE";

export type TargetType = "ALL" | "FEMALE" | "MALE" | "YOUTH";

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

export interface ProductDetailDataDto {
  data: cardItemData[];
}
