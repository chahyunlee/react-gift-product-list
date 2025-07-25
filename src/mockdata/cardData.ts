export interface MockCardData {
  id: number;
  imageURL: string;
  brandInfo: { id: number; name: string; imageURL: string };
  name: string;
  price: { basicPrice: number; discountRate: number; sellingPrice: number };
}

const singleCard: MockCardData = {
  id: 123,
  name: "BBQ 양념치킨+크림치즈볼+콜라1.25L",
  imageURL:
    "https://st.kakaocdn.net/product/gift/product/20231030175450_53e90ee9708f45ffa45b3f7b4bc01c7c.jpg",
  price: {
    basicPrice: 29000,
    discountRate: 0,
    sellingPrice: 29000,
  },
  brandInfo: {
    id: 2088,
    name: "BBQ",
    imageURL:
      "https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png",
  },
};

export const cardData: MockCardData[] = Array.from({ length: 21 }, (_, i) => ({
  ...singleCard,
  id: i + 1,
}));
