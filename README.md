# react-native-ui-toolkit
UI Toolkit For React Native
## Installation

```sh
npm install react-native-ui-toolkit
```

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/45430120/188515716-204caf64-9313-4056-b426-957dc4893d40.gif)


## Usage

```js
import { ScrollableHeader } from "react-native-ui-toolkit";





// ...

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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

