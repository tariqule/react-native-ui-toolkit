# react-native-ui-toolkit
UI Toolkit For React Native
## Installation

```sh
npm install react-native-ui-toolkit
```
![ezgif com-gif-maker](https://user-images.githubusercontent.com/45430120/188515577-0f19bc43-8a30-4200-930c-e4eabb312c26.gif)


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

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
