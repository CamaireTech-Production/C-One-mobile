/**
 * DetailCarousel Component
 * Carousel with background image, description text, button, and navigation dots
 * Auto-scrolls with smooth animation
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Animated,
  ImageSourcePropType,
} from 'react-native';

import { colors, spacing, typography } from '@theme';
import { Icon } from '@components/common/icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface CarouselSlide {
  image: ImageSourcePropType;
  description: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
}

interface DetailCarouselProps {
  slides: CarouselSlide[];
  autoScrollInterval?: number; // in milliseconds
}

export const DetailCarousel: React.FC<DetailCarouselProps> = ({
  slides,
  autoScrollInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<any>(null);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (slides.length <= 1) return;

    const startAutoScroll = () => {
      autoScrollTimer.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % slides.length;
          scrollToIndex(next);
          return next;
        });
      }, autoScrollInterval);
    };

    startAutoScroll();

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [slides.length, autoScrollInterval]);

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / SCREEN_WIDTH);
        if (index !== currentIndex && index >= 0 && index < slides.length) {
          setCurrentIndex(index);
        }
      },
    }
  );

  if (slides.length === 0) return null;

  // Use the first slide's image as the background (or all slides can have the same image)
  const backgroundImage = slides[0]?.image;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Carousel content (text and button) */}
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const index = Math.round(offsetX / SCREEN_WIDTH);
              setCurrentIndex(index);
            }}
            style={styles.carouselScrollView}
            contentContainerStyle={styles.carouselContent}
          >
            {slides.map((slide, index) => (
              <View key={index} style={styles.slide}>
                <View style={styles.content}>
                  <Text style={styles.description}>{slide.description}</Text>
                  {slide.buttonLabel && slide.onButtonPress && (
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.explorerButton}
                        onPress={slide.onButtonPress}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.explorerButtonText}>
                          {slide.buttonLabel}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </Animated.ScrollView>

          {/* Navigation Dots - positioned on the image */}
          <View style={styles.dotsContainer}>
            {slides.map((_, index) => {
              const isActive = index === currentIndex;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    scrollToIndex(index);
                    setCurrentIndex(index);
                  }}
                  activeOpacity={0.7}
                  style={styles.dotButton}
                >
                  <Icon
                    name={isActive ? 'radio-button-checked' : 'circle-outline'}
                    size={isActive ? 8 : 6}
                    color={colors.secondary.white}
                    family={isActive ? 'material' : 'materialcommunity'}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    paddingBottom: spacing.md,
  },
  carouselScrollView: {
    flex: 1,
  },
  carouselContent: {
    alignItems: 'center',
  },
  slide: {
    width: SCREEN_WIDTH,
    justifyContent: 'flex-end',
    // paddingBottom: spacing.xs,
    paddingHorizontal: spacing.lg,
  },
  content: {
    alignItems: 'center',
    gap: spacing.base,
  },
  description: {
    ...typography.styles.bodyRegular16,
    color: colors.text.inverse,
    textAlign: 'center',
    marginBottom: spacing.md,
    marginHorizontal: spacing.lg,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 200,
    alignItems: 'center',
  },
  explorerButton: {
    backgroundColor: colors.overlay.white33,
    borderWidth: 0,
    borderRadius: 100,
    width: 124,
    height: 34,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0,
    elevation: 0,
  },
  explorerButtonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    // paddingTop: spacing.sm,
    // paddingBottom: spacing.sm,
  },
  dotButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

