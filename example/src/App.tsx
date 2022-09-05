import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { ScrollableHeader } from '../../src/index';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollableHeader
        bounces={false}
        headerType={'DetailsHeader'}
        backgroundColor={'grey'}
        hasBorderRadius
        headerHeight={105}
        imgUrl={
          'https://thumbs.dreamstime.com/z/bombay-potato-curry-indian-food-29146242.jpg'
        }
        title={'Food Title'}
      >
        <Text>Hellow</Text>
      </ScrollableHeader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
