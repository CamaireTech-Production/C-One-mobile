/**
 * RestaurantCategoryCard Component
 * Wrapper around CategoryCard for restaurant categories
 * Maintains backward compatibility
 */

import React from 'react';
import { CategoryCard, CategoryCardProps } from './CategoryCard';

export interface RestaurantCategoryCardProps extends CategoryCardProps {}

export const RestaurantCategoryCard: React.FC<RestaurantCategoryCardProps> = (props) => {
  return <CategoryCard {...props} />;
};

