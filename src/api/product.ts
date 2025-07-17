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
  try {
    const response = await apiUser.get<ProductDetailDataDto>(
      "/products/ranking",
      {
        params: {
          targetType: targetType,
          rankType: rankType,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("랭킹 상품 목록을 불러오는데 실패했습니다:", error);
    throw error;
  }
}
