import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

function showAverage(p, size) {
  let result = 0;
  let length = 0;

  if (p && p.ratings && p.ratings.length > 0) {
    let ratingsArray = p && p.ratings;
    let total = [];
    length = ratingsArray.length;
    ratingsArray.map((r) => total.push(r.star));

    let totalReduce = total.reduce((p, n) => p + n, 0);
    let highest = length * 5;
    result = (totalReduce * 5) / highest;
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row'
    },
    counter: {
      fontSize: size,
      color: "#666"
    }
  });

  return (
    <View style={styles.container
    }>
      <StarRating
        maxStars={5}
        rating={result}
        starSize={size}
        enableHalfStar={true}
        onChange={() => ""}
      />
      <Text style={styles.counter}>
        ({length})
      </Text>
    </View>
  );
};

export default showAverage;
