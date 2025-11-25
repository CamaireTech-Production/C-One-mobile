/**
 * AnimatedList Component
 * List with progressive fade in animation for items
 */

import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, FlatListProps } from 'react-native';
import { ANIMATION_DURATION } from '../../utils/constants';

interface AnimatedListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  data: T[];
  renderItem: (item: T, index: number, animatedValue: Animated.Value) => React.ReactElement;
  itemDelay?: number;
  itemDuration?: number;
}

export function AnimatedList<T>({
  data,
  renderItem,
  itemDelay = 50,
  itemDuration = ANIMATION_DURATION.normal,
  ...flatListProps
}: AnimatedListProps<T>) {
  const animatedValues = useRef<Animated.Value[]>(
    data.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Update animated values array if data length changes
    if (animatedValues.length !== data.length) {
      animatedValues.length = data.length;
      for (let i = animatedValues.length; i < data.length; i++) {
        animatedValues[i] = new Animated.Value(0);
      }
    }

    // Animate items progressively
    const animations = animatedValues.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: itemDuration,
        delay: index * itemDelay,
        useNativeDriver: true,
      })
    );

    Animated.stagger(itemDelay, animations).start();
  }, [data.length, itemDelay, itemDuration]);

  const renderAnimatedItem = ({ item, index }: { item: T; index: number }) => {
    return renderItem(item, index, animatedValues[index] || new Animated.Value(1));
  };

  return (
    <Animated.FlatList
      {...flatListProps}
      data={data as any}
      renderItem={renderAnimatedItem}
    />
  );
}

