import { useParams, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { createOrder } from "@/api/user/order";
import { OrderCardData } from "@/mockdata/ordercardData";
import CardSelectionSection from "@/pages/OrderPage/components/CardSelectionSection/CardSelectionSection";
import SenderInfoSection from "@/pages/OrderPage/components/SenderInfoSection/SenderInfoSection";
import GroupGettersInfoSection from "@/pages/OrderPage/components/GroupGettersInfoSection/GroupGettersInfoSection";
import OrderSummarySection from "@/pages/OrderPage/components/OrderSummarySection/OrderSummarySection";
import { toast } from "react-toastify";

export type FormValues = {
  selectedIdx: number;
  senderName: string;
  quantity: number;
  cardMessage: string;
  getters: { name: string; phone: string; quantity: number }[];
};

const OrderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const defaultSenderName = userInfo?.data?.name || "";

  const methods = useForm<FormValues>({
    defaultValues: {
      selectedIdx: 0,
      senderName: defaultSenderName,
      quantity: 1,
      cardMessage: OrderCardData[0].defaultTextMessage,
      getters: [],
    },
  });

  const { handleSubmit } = methods;

  const getToken = (): string | null => {
    const tokenData = localStorage.getItem("userInfo");
    return tokenData ? JSON.parse(tokenData).authToken : null;
  };

  const createOrderDto = (data: FormValues) => ({
    productId,
    message: data.cardMessage,
    messageCardId: `${data.selectedIdx}`,
    ordererName: data.senderName,
    receivers: data.getters.map((getter) => ({
      name: getter.name,
      phoneNumber: getter.phone,
      quantity: getter.quantity,
    })),
  });

  const handleOrderSubmission = async (data: FormValues) => {
    const orderDto = createOrderDto(data);

    try {
      await createOrder(orderDto);
      window.alert(
        `주문이 완료되었습니다.\n` +
          `구매 수량: ${data.quantity}\n` +
          `발신자 이름: ${data.senderName}\n` +
          `메시지: ${data.cardMessage}`
      );
      navigate("/", { replace: true });
    } catch (error) {
      window.alert("주문에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <NavigationBar />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleOrderSubmission)}>
          <CardSelectionSection />
          <SenderInfoSection />
          <GroupGettersInfoSection />
          <OrderSummarySection productId={productId} />
        </form>
      </FormProvider>
    </>
  );
};

export default OrderPage;
