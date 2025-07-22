export interface ReceiverDto {
  name: string;
  phoneNumber: string;
  quantity: number;
}

export interface CreateOrderDto {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: ReceiverDto[];
}

export interface OrderResponseDto {
  orderId: string;
  status: string;
  message: string;
}
