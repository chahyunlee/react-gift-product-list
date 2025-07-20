import { AxiosError } from "axios";
import apiUser from "@/api/common/apiUser";
import type { CreateOrderDto, OrderResponseDto } from "@/types/DTO/orderDTO";

export async function createOrder(
  orderData: CreateOrderDto
): Promise<OrderResponseDto> {
  try {
    const response = await apiUser.post<OrderResponseDto>("/order", orderData);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
}
