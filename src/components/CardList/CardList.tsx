import { Grid } from "@/components/CardList/CardList.style";
import Card from "@/components/Card/Card";
import type { CommonCardItem } from "@/types/DTO/productDTO";
import type { RefObject } from "react";

interface CardListProps {
  cards: CommonCardItem[];
  showRank?: boolean;
  onCardClick?: (id: number) => void;
  lastCardRef?: RefObject<HTMLDivElement | null>;
}

export default function CardList({
  cards,
  onCardClick,
  showRank,
  lastCardRef,
}: CardListProps) {
  return (
    <Grid>
      {cards.map((card, idx) => {
        const isLast = idx === cards.length - 1;
        return (
          <Card
            key={card.id}
            rank={showRank ? idx + 1 : -1}
            imageUrl={card.imageUrl}
            brand={card.brand}
            name={card.name}
            price={card.price}
            onClick={onCardClick ? () => onCardClick(card.id) : undefined}
            ref={isLast ? lastCardRef : undefined}
          />
        );
      })}
    </Grid>
  );
}
