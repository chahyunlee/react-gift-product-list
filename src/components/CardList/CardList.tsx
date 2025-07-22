import { Grid } from "@/components/CardList/CardList.style";
import Card from "@/components/Card/Card";
import type { CommonCardItem } from "@/types/DTO/productDTO";

interface CardListProps {
  cards: CommonCardItem[];
  showRank?: boolean;
  onCardClick?: (id: number) => void;
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
