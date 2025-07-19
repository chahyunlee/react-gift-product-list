import apiUser from "@/api/common/apiUser";
import type {
  RankingRequestParams,
  cardItemData,
  ProductDetailDataDto,
  ProductSummaryResponse,
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

export async function getProductSummary(
  productId: number
): Promise<ProductSummaryResponse> {
  const response = await apiUser.get<ProductSummaryResponse>(
    `/products/${productId}/summary`
  );
  return response.data;
}
