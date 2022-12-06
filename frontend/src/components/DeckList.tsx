import React from 'react';
import { List } from '@chakra-ui/react';
import { map } from 'lodash';
import { t } from 'ttag';

import { DeckFragment } from '../generated/graphql/apollo-schema';
import { useAuth } from '../lib/AuthContext';
import { DeckRow } from './Deck';
import { CardsMap, CategoryTranslations } from '../lib/hooks';
import { Text } from '@chakra-ui/react';

export default function DeckList({
  categoryTranslations,
  roleCards,
  decks,
}: {
  decks: DeckFragment[] | undefined;
  categoryTranslations: CategoryTranslations;
  roleCards: CardsMap;
}) {
  if (!decks?.length) {
    return <Text>{t`You don't seem to have any decks.`}</Text>
  }
  return (
    <List>
      { map(decks, deck => (
        <DeckRow
          key={deck.id}
          deck={deck}
          categoryTranslations={categoryTranslations}
          roleCards={roleCards}
        />
      )) }
    </List>
  );
}