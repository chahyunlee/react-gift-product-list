import { AxiosError } from "axios";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { FormValues } from "@/pages/OrderPage/OrderPage";
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
  const navigate = useNavigate();
  const { watch } = useFormContext<FormValues>();
  const [product, setProduct] = useState<ProductSummaryDto | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductSummary(productId);
        setProduct(res.data);
      } catch (err) {
        const error = err as AxiosError;
        const status = error?.response?.status;

        if (status && status >= 400 && status < 500) {
          toast.error("상품 정보를 불러올 수 없습니다. 다시 시도해주세요.");
          navigate("/home");
        } else {
          toast.error(
            "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
        }
      }
    };
    fetchProduct();
  }, [productId, navigate]);

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
