import React from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ViewStyle,
  TextStyle,
  StyleProp,
  Dimensions,
} from 'react-native';
import { constants } from '../../constants';
import styles from './ScrollableTabBar.styles';

const UNDERLINE_PADDING = 20;

export type ScrollableTabBarProps = {
  tabs: any;
  activeTab: number;
  goToPage: (index: number) => void;
  scrollValue: Animated.Value;
  tabTextStyle: StyleProp<TextStyle>;
  tabTextActiveStyle: StyleProp<TextStyle>;
  tabTextContainerStyle: StyleProp<ViewStyle>;
  tabTextContainerActiveStyle: StyleProp<ViewStyle>;
  tabsContainerBackgroundColor?: string;
  tabWrapperStyle?: StyleProp<ViewStyle>;
  tabsContainerStyle?: StyleProp<ViewStyle>;
  tabUnderlineColor?: string | null;
  tabsContainerHorizontalPadding?: number;
};
type State = { tabUnderlineWidth: number[] };

class ScrollableTabBar extends React.PureComponent<
  ScrollableTabBarProps,
  State
> {
  tabsWidth: number[];

  scrollView: ScrollView | null;

  currentXPosition: number;

  constructor(props: ScrollableTabBarProps) {
    super(props);
    this.currentXPosition = 0;
    this.scrollView = null;
    this.tabsWidth = this.props.tabs.map(() => 0);
    this.state = {
      tabUnderlineWidth: props.tabs.map((_: any) => 0),
    };
  }

  componentDidUpdate(prevProps: Readonly<ScrollableTabBarProps>) {
    const { activeTab } = this.props;

    if (prevProps.activeTab !== activeTab) {
      this.scrollToTab(activeTab);
    }
  }

  adjustPrevious = (page: number) => {
    const lastHidden = Math.floor(
      this.currentXPosition / (constants.deviceWidth * 0.3)
    );

    if (page <= lastHidden) {
      this.currentXPosition = constants.deviceWidth * 0.3 * page;
      this?.scrollView?.scrollTo?.({
        x: this.currentXPosition,
      });
    }
  };

  adjustNext = (page: number) => {
    const invisibleX =
      constants.deviceWidth +
      this.currentXPosition -
      constants.deviceWidth * 0.3 * (page + 1);

    if (invisibleX < 0) {
      this.currentXPosition = this.currentXPosition - invisibleX;
      this?.scrollView?.scrollTo?.({
        x: this.currentXPosition,
      });
    }
  };

  scrollToTab = (page: number) => {
    const { tabs } = this.props;

    if (tabs.length > 3) {
      if (page === 0) {
        this?.scrollView?.scrollTo?.({
          x: 0,
        });
        this.currentXPosition = 0;
      } else if (page !== tabs.length - 1) {
        this.adjustPrevious(page - 1);
        this.adjustNext(page + 1);
      } else {
        this?.scrollView?.scrollToEnd?.();
        this.currentXPosition =
          constants.deviceWidth * 0.3 * tabs.length - constants.deviceWidth;
      }
    }
  };

  goToPage = (page: number) => {
    const { goToPage } = this.props;

    this.scrollToTab(page);

    return goToPage(page);
  };

  renderIcon = (icon: any, page: number) => {
    const { activeTab } = this.props;
    const isActive = activeTab === page;

    if (typeof icon === 'function') {
      return icon(isActive);
    }

    return icon;
  };

  render() {
    const {
      activeTab,
      scrollValue,
      tabs,
      tabTextStyle,
      tabTextActiveStyle,
      tabTextContainerStyle,
      tabTextContainerActiveStyle,
      tabsContainerBackgroundColor,
      tabWrapperStyle,
      tabsContainerStyle,
      tabUnderlineColor,
      tabsContainerHorizontalPadding,
    } = this.props;
    const { tabUnderlineWidth } = this.state;

    const HORIZONTAL_PADDINGS =
      tabsContainerHorizontalPadding ?? UNDERLINE_PADDING;

    const allSizes =
      this.tabsWidth.every((it) => !!it) &&
      this.tabsWidth.length > 0 &&
      tabUnderlineColor;
    const inputRanges = allSizes ? [0] : [0, 1];
    const outputRanges = allSizes
      ? [HORIZONTAL_PADDINGS]
      : [HORIZONTAL_PADDINGS, 100];
    let tabWidth = HORIZONTAL_PADDINGS;

    if (tabUnderlineColor) {
      for (let i = 0; i < this.tabsWidth.length; i++) {
        if (this.tabsWidth.length && allSizes) {
          if (i > 0) {
            inputRanges[i] = Dimensions.get('screen').width * i;
            outputRanges[i] = tabWidth;
          }
          tabWidth += this.tabsWidth[i] || 0;
        }
      }
    }
    const translateX = scrollValue.interpolate({
      inputRange: inputRanges,
      outputRange: outputRanges,
    });

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: tabsContainerBackgroundColor,
          },
        ]}
      >
        <ScrollView
          style={styles.nestedStyle}
          contentContainerStyle={[
            styles.contentContainer,
            tabsContainerStyle,
            styles.noMargins,
            {
              paddingLeft: HORIZONTAL_PADDINGS,
              paddingRight: HORIZONTAL_PADDINGS,
            },
          ]}
          ref={(r) => (this.scrollView = r)}
          onScrollEndDrag={(event) =>
            (this.currentXPosition = event.nativeEvent.contentOffset.x)
          }
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
        >
          {tabs.map((tab: any, page: any) => {
            const isTabActive = activeTab === page;
            const tabKey = tab.title || `tab ${page}`;

            return (
              <TouchableOpacity
                onLayout={(x) => {
                  this.tabsWidth[page] = x.nativeEvent.layout.width;
                }}
                key={tabKey}
                accessible
                style={[tabWrapperStyle, styles.noMargins]}
                accessibilityLabel={tabKey}
                accessibilityRole="button"
                activeOpacity={0.9}
                onPress={() => this.goToPage(page)}
              >
                <View
                  style={[
                    styles.tabContainer,
                    tabTextContainerStyle,
                    isTabActive && tabTextContainerActiveStyle,
                  ]}
                >
                  {this.renderIcon(tab.icon, page)}
                  {tab.title && (
                    <Text
                      onLayout={({
                        nativeEvent: {
                          layout: { width },
                        },
                      }) => {
                        const newWidth = [...tabUnderlineWidth];

                        newWidth[page] = width;
                        this.setState({
                          tabUnderlineWidth: newWidth,
                        });
                      }}
                      style={[
                        styles.tabText,
                        tabTextStyle,
                        isTabActive && tabTextActiveStyle,
                      ]}
                    >
                      {tab.title}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
          {tabUnderlineColor && (
            <Animated.View
              style={[
                styles.tabUnderlineStyles,
                {
                  width: this.tabsWidth[activeTab],
                  backgroundColor: tabUnderlineColor,
                  transform: [
                    {
                      translateX,
                    },
                  ],
                },
              ]}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

export default ScrollableTabBar;
