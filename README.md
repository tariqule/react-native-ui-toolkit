# react-native-ui-toolkit
UI Toolkit For React Native
## Installation

```sh
npm install react-native-ui-toolkit
```
https://user-images.githubusercontent.com/45430120/188515461-bf21c2ac-8b9f-4b38-ad70-cfed97b8a86d.mov

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
