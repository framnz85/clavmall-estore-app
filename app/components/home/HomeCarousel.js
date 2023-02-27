import React, {useState} from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
import TypeWriter from 'react-native-typewriter'

import { clavmallImg, estoreID } from '../../functions/env';

const HomeCarousel = ({ navigation }) => {
  const [typingEnd, setTypingEnd] = useState(1)
  
  const { estore } = useSelector((state) => ({ ...state }));

  const SLIDER_WIDTH = Dimensions.get('window').width - (Platform.OS === "ios" ? 20 : 28);
  const SLIDER_HEIGHT = SLIDER_WIDTH * 0.196;

  const renderItem = ({item, index}) => {
        return (
          <View key={index}>
            <Image source={{ uri: clavmallImg + "/estore_images/estore" + estoreID + "/thumb/" + item.url }} style={styles.image} />
          </View>
        );
  }

  const getTextLength = () => {
    return estore.textCarousel.filter((txt) => txt.name !== "").length;
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: 12,
      marginRight: Platform.OS === "ios" ? 11 : 13,
      marginLeft: Platform.OS === "ios" ? 11 : 14,
      borderRadius: 6,
      overflow: "hidden"
    },
    image: {
      width: SLIDER_WIDTH,
      height: SLIDER_HEIGHT
    },
    textCarousel: {
      width: "100%",
      height: 33,
      alignItems: "center",
      backgroundColor: estore.carouselColor ? estore.carouselColor : "#dbefdc",
      marginTop: 10,
      marginBottom: 3,
      padding: 5,
    }
  });
  
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
          <Carousel
            layout="tinder"
            ref={null}
            data={estore.carouselImages}
            renderItem={renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={SLIDER_WIDTH}
            autoplay={true}
            loop={true}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textCarousel}>
        <Text style={{ color: estore.headerColor, fontSize: 16 }}>
          {estore.textCarousel && estore.textCarousel
            .filter((txt) => txt.name !== "")
            .map((txt, index) => {
              return (
                <Text key={txt.name}>
                  {typingEnd === (index + 1) && (
                    <TypeWriter
                      typing={1}
                      onTypingEnd={() => setTypingEnd(getTextLength() === (index + 1) ? 1 : index + 2 )}
                      maxDelay={200}
                    >
                    {txt.name}x
                  </TypeWriter>)}
                </Text>
              )
            })
          }
        </Text>
      </View>
    </View>
  );
};

export default HomeCarousel;
