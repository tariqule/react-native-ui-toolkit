import React, { ReactElement } from 'react';
import {
  Animated,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconRenderer from '../../components/IconRenderer/IconRenderer';
import { colors, constants, sizes } from '../../constants';
import type {
  IconProps,
  RenderBody,
  SharedPredefinedHeaderProps,
} from '../../index';
import StickyParallaxHeader, {
  StickyParallaxHeaderProps,
} from '../../StickyParallaxHeaderComponent';
import styles from './DetailsHeader.styles';

const { event, ValueXY } = Animated;

export interface DetailsHeaderProps
  extends IconProps,
    SharedPredefinedHeaderProps,
    RenderBody {
  headerType: 'DetailsHeader';
  hasBorderRadius?: boolean;
  image?: ImageSourcePropType;
  contentIcon?: ImageSourcePropType;
  contentIconNumber?: number;
  tag?: string;
  title?: string;
  bodyTitle?: string;
  titleComponent?: React.ReactNode;
}
type State = {
  headerLayout: {
    height: number;
  };
};

class DetailsHeader extends React.Component<DetailsHeaderProps, State> {
  scrollY: Animated.ValueXY;

  constructor(props: DetailsHeaderProps) {
    super(props);
    this.state = {
      headerLayout: {
        height: 0,
      },
    };

    this.scrollY = new ValueXY();
  }

  setHeaderSize: StickyParallaxHeaderProps['headerSize'] = (headerLayout) => {
    const { headerSize } = this.props;

    if (headerSize) headerSize(headerLayout);
    this.setState({ headerLayout });
  };

  scrollPosition = (value: number): number => {
    const { headerLayout } = this.state;

    return constants.scrollPosition(headerLayout.height, value);
  };

  renderHeader = (): ReactElement => {
    const {
      backgroundColor,
      leftTopIconOnPress,
      rightTopIconOnPress,
      leftTopIcon,
      rightTopIcon,
      title,
      headerHeight,
    } = this.props;

    const opacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(60), this.scrollPosition(90)],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    const height = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(60), this.scrollPosition(90)],
      outputRange: [0, 0, headerHeight || 100],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.headerWrapper,
          { backgroundColor, height: height, opacity: opacity },
        ]}
      >
        <View style={styles.headerMenu}>
          <TouchableOpacity
            hitSlop={sizes.hitSlop}
            onPress={leftTopIconOnPress}
          >
            <IconRenderer icon={leftTopIcon} />
          </TouchableOpacity>
          <Animated.View style={[styles.headerTitleContainer, { opacity }]}>
            <Text style={styles.headerTitle}>
              {title && title?.length > 30
                ? title?.substring(0, 30).concat('...')
                : title}
            </Text>
          </Animated.View>
          <TouchableOpacity
            hitSlop={sizes.hitSlop}
            onPress={rightTopIconOnPress}
          >
            <IconRenderer icon={rightTopIcon} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  renderDetailsForeground = () => {
    const { tag } = this.props;
    const labelOpacity = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(19), this.scrollPosition(25)],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.foreground}>
        <Animated.View
          style={[
            styles.foregroundTitle,

            {
              opacity: labelOpacity,
              backgroundColor: colors.whiteTransparent10,
            },
          ]}
        >
          <Text style={styles.foregroundText}>{tag}</Text>
        </Animated.View>
      </View>
    );
  };

  renderBackground = () => {
    const { hasBorderRadius, backgroundColor, titleComponent, imgUrl } =
      this.props;
    const {
      headerLayout: { height },
    } = this.state;

    const o = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(55), this.scrollPosition(70)],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp',
    });

    const headerBorderRadius = hasBorderRadius
      ? this.scrollY.y.interpolate({
          inputRange: [0, height],
          outputRange: [80, 0],
          extrapolate: 'extend',
        })
      : 0;

    return (
      <>
        <View>
          <Animated.Image
            source={{
              uri: imgUrl,
            }}
            style={[
              styles.background,

              {
                borderBottomRightRadius: headerBorderRadius,
                backgroundColor,
              },
            ]}
          />
        </View>
        <Animated.View style={{ opacity: o }}>
          {titleComponent && titleComponent}
        </Animated.View>
      </>
    );
  };
  CustomHeaderWrapper() {
    const { customHeader } = this.props;

    const o = this.scrollY.y.interpolate({
      inputRange: [0, this.scrollPosition(55), this.scrollPosition(70)],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp',
    });

    return (
      customHeader && (
        <Animated.View
          style={{ position: 'absolute', top: 0, zIndex: 1000, opacity: o }}
        >
          {customHeader}
        </Animated.View>
      )
    );
  }

  render() {
    const {
      backgroundImage,
      children,
      headerHeight,
      snapToEdge,
      bounces,
      parallaxHeight,
      onMomentumScrollEnd,
      onMomentumScrollBegin,
      scrollRef,
      contentContainerStyles,
      keyboardShouldPersistTaps,
      refreshControl,
      horizontalScrollBounces,
    } = this.props;

    return (
      <>
        {/* <StatusBar barStyle="light-content" backgroundColor={backgroundColor} translucent /> */}
        {this.CustomHeaderWrapper()}

        <StickyParallaxHeader
          scrollEvent={event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }],
            {
              useNativeDriver: false,
            }
          )}
          background={this.renderBackground()}
          backgroundImage={backgroundImage}
          bounces={bounces}
          contentContainerStyles={contentContainerStyles}
          foreground={this.renderDetailsForeground()}
          header={this.renderHeader()}
          headerHeight={headerHeight}
          headerSize={this.setHeaderSize}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          parallaxHeight={parallaxHeight}
          refreshControl={refreshControl}
          scrollRef={scrollRef}
          snapToEdge={snapToEdge}
          horizontalScrollBounces={horizontalScrollBounces}
          transparentHeader={false}
        >
          {children}
        </StickyParallaxHeader>
      </>
    );
  }

  static defaultProps = {
    headerHeight: sizes.cardScreenHeaderHeight,
    bounces: true,
    snapToEdge: true,
    hasBorderRadius: true,
    parallaxHeight: sizes.cardScreenParallaxHeader,
    headerSize: undefined,
    scrollRef: null,
  };
}

export default DetailsHeader;
