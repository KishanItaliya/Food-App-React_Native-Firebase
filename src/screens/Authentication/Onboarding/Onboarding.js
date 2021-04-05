import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, FlatList} from 'react-native';
import {images, COLORS, SIZES, FONTS} from '../../../constants';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import NextButton from './NextButton';

const slides = [
  {
    id: '1',
    title: '', //Delicious
    subtitle: 'Choose Your Meal',
    description:
      "Hungry? Order food in just a few clicks and we'll take care of you..",
    color: '#72BCD4',
    picture: {
      src: require('../../../assets/images/1.png'),
      width: 4875,
      height: 3883,
    },
    img: images.onboarding1,
  },
  {
    id: '2',
    title: '', //Fast
    subtitle: 'Track Delivery',
    description: 'Track your food order in real-time with an interactive map.',
    color: '#FFB6C1',
    picture: {
      src: require('../../../assets/images/3.png'),
      width: 5025,
      height: 3920,
    },
    img: images.onboarding2,
  },
  {
    id: '3',
    title: '', //Support
    subtitle: 'Seamless Payments',
    description:
      'Pay with your credit cards, Apple Pay or Android Pay, with one click.',
    color: '#FFC04C',
    picture: {
      src: require('../../../assets/images/2.png'),
      width: 5025,
      height: 3965,
    },
    img: images.onboarding3,
  },
];

const OnboardingScreen = ({navigation}) => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      setCompleted(Math.floor(value / SIZES.width));
    });
  });

  const slidesRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.navigate('Welcome');
    }
  };

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={{flex: 5}}>
        <FlatList
          horizontal
          data={slides}
          renderItem={({item}) => <OnboardingItem item={item} />}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </Animated.View>
      <View style={{flex: 2}}>
        <Paginator data={slides} scrollX={scrollX} />
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / slides.length)}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});

export default OnboardingScreen;
