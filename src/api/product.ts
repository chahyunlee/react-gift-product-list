import apiUser from "@/api/apiUser";
import type {
  RankingRequestParams,
  cardItemData,
  ProductDetailDataDto,
} from "@/types/DTO/productDTO";

export async function getRanking({
  targetType,
  rankType,
}: RankingRequestParams): Promise<cardItemData[]> {
  const response = await apiUser.get<ProductDetailDataDto>(
    "/products/ranking",
    {
      params: {
        targetType,
        rankType,
      },
    }
  );
  return response.data.data;
}
