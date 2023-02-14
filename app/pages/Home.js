import React, {useState} from "react";
import { View, ScrollView } from 'react-native';

import Header from "../components/nav/Header";
import HomeCarousel from "../components/home/HomeCarousel";
import ItemsForYou from "../components/home/ItemsForYou";

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

function Home({route, parentNavigation}) {
  const { refresh } = route.params ? route.params : "0";
  
  const [botReach, setBotReach] = useState(false); 
  
  return (
      <View>
      <Header navigation={parentNavigation} />
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setBotReach(true);
          }
        }}
        scrollEventThrottle={400}
      >
        <HomeCarousel navigation={parentNavigation} />
        <ItemsForYou
          navigation={parentNavigation}
          botReach={botReach}
          setBotReach={setBotReach}
          refresh={refresh}
        />
        </ScrollView>
      </View>
  );
}

export default Home;