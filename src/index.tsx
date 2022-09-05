import React, { ReactElement, ReactNode, VFC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import type { DetailsHeaderProps } from './predefinedComponents';
import { DetailsHeader } from './predefinedComponents';
import type { StickyParallaxHeaderProps } from './StickyParallaxHeaderComponent';

export type { DetailsHeaderProps };
export type { StickyParallaxHeaderProps };

export interface OnChangeTabArguments {
  from: number;
  i: number;
  ref: any;
}

export type MountedTabType = {
  i: number;
  ref: React.ReactElement | React.ReactFragment | null | undefined;
  from: number;
};

export interface Tab {
  content: ReactElement;
  title?: string;
  icon?: ReactElement | ((isActive: boolean) => ReactElement);
}

export interface SharedPredefinedHeaderProps {
  backgroundColor?: string;
  backgroundImage?: StickyParallaxHeaderProps['backgroundImage'];
  bounces?: StickyParallaxHeaderProps['bounces'];
  horizontalScrollBounces?: StickyParallaxHeaderProps['horizontalScrollBounces'];
  contentContainerStyles?: StickyParallaxHeaderProps['contentContainerStyles'];
  headerHeight?: StickyParallaxHeaderProps['headerHeight'];
  headerSize?: StickyParallaxHeaderProps['headerSize'];
  keyboardShouldPersistTaps?: StickyParallaxHeaderProps['keyboardShouldPersistTaps'];
  onMomentumScrollBegin?: StickyParallaxHeaderProps['onMomentumScrollBegin'];
  onMomentumScrollEnd?: StickyParallaxHeaderProps['onMomentumScrollEnd'];
  parallaxHeight?: StickyParallaxHeaderProps['parallaxHeight'];
  refreshControl?: StickyParallaxHeaderProps['refreshControl'];
  scrollEvent?: StickyParallaxHeaderProps['scrollEvent'];
  scrollRef?: StickyParallaxHeaderProps['scrollRef'];
  snapStartThreshold?: StickyParallaxHeaderProps['snapStartThreshold'];
  snapStopThreshold?: StickyParallaxHeaderProps['snapStopThreshold'];
  snapToEdge?: StickyParallaxHeaderProps['snapToEdge'];
  snapValue?: StickyParallaxHeaderProps['snapValue'];
  customHeader?: React.ReactNode;
  imgUrl?: string;
}

export interface IconProps {
  leftTopIcon?: (() => ReactElement) | ImageSourcePropType;
  leftTopIconOnPress?: () => void;
  rightTopIcon?: (() => ReactElement) | ImageSourcePropType;
  rightTopIconOnPress?: () => void;
}
export interface RenderBody {
  children?: ReactNode;
}

type Props = DetailsHeaderProps;

export const ScrollableHeader: VFC<Props> = (props: Props) => {
  return <DetailsHeader {...props} />;
};
