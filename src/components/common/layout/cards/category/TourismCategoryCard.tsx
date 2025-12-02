/**
 * TourismCategoryCard Component
 * Wrapper around CategoryCard for tourism categories
 * Maintains backward compatibility
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import { CategoryCard, CategoryCardProps } from './CategoryCard';

export interface TourismCategoryCardProps extends CategoryCardProps {}

export const TourismCategoryCard: React.FC<TourismCategoryCardProps> = (props) => {
  return <CategoryCard {...props} />;
};

