import {
  CardWrapper,
  RankNumber,
  Image,
  Info,
  Brand,
  Name,
  Price,
} from "@/components/Card/Card.style";

export interface CardProps {
  rank: number;
  imageUrl: string;
  brand: string;
  name: string;
  price: number;
  onClick?: () => void;

}

export default function Card({
  rank,
  imageUrl,
  brand,
  name,
  price,
  onClick,
}: CardProps) {
  return (
    <CardWrapper onClick={onClick} style={{ cursor: "pointer" }}>
      <RankNumber>{rank}</RankNumber>
      <Image src={imageUrl} />
      <Info>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>
        <Price>
          {price.toLocaleString()}{" "}
          <span style={{ fontWeight: 500, fontSize: "1rem" }}>원</span>
        </Price>
      </Info>
    </CardWrapper>
  );
}
