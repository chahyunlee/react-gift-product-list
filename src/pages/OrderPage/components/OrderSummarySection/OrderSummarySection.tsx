import { useFormContext } from "react-hook-form";
import type { FormValues } from "@/pages/OrderPage/OrderPage";
import { useEffect, useState } from "react";
import { getProductSummary } from "@/api/user/product";
import type { ProductSummaryDto } from "@/types/DTO/productDTO";
import {
  ProductInfoSection,
  SectionTitle,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductBrand,
  ProductPrice,
  FixedOrderButton,
  SectionDivider,
} from "@/pages/OrderPage/OrderPage.style";

interface Props {
  productId: number;
}

const OrderSummarySection = ({ productId }: Props) => {
  const { watch } = useFormContext<FormValues>();
  const [product, setProduct] = useState<ProductSummaryDto | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductSummary(productId);
        setProduct(res.data);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchProduct();
  }, [productId]);

  const getters = watch("getters") || [];
  const totalQuantity = getters.reduce(
    (sum, { quantity }) => sum + Number(quantity || 0),
    0
  );
  const totalPrice = product ? product.price * totalQuantity : 0;

  return (
    <>
      <SectionDivider />
      <ProductInfoSection>
        <SectionTitle>상품 정보</SectionTitle>
        {product && (
          <ProductCard>
            <ProductImage src={product.imageURL} />
            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductBrand>{product.brandName}</ProductBrand>
              <ProductPrice>
                상품가 <b>{product.price}원</b>
              </ProductPrice>
            </ProductInfo>
          </ProductCard>
        )}
      </ProductInfoSection>
      <FixedOrderButton type="submit">{totalPrice}원 주문하기</FixedOrderButton>
    </>
  );
};

export default OrderSummarySection;
