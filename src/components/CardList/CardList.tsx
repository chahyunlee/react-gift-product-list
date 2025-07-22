import { Grid } from "@/components/CardList/CardList.style";
import Card from "@/components/Card/Card";

export interface CardListProps {
  cards: {
    id: number;
    imageUrl: string;
    brand: string;
    name: string;
    price: number;
  }[];
  onCardClick: (cardId: number) => void;
  showRank?: boolean;
}

export default function CardList({
  cards,
  onCardClick,
  showRank,
}: CardListProps) {
  return (
    <Grid>
      {cards.map((card, idx) => (
        <Card
          key={card.id}
          rank={showRank ? idx + 1 : -1}
          imageUrl={card.imageUrl}
          brand={card.brand}
          name={card.name}
          price={card.price}
          onClick={onCardClick ? () => onCardClick(card.id) : undefined}
        />
      ))}
    </Grid>
  );
}
