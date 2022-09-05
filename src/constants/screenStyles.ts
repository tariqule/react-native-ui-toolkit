import { StyleSheet, Platform } from 'react-native';
import { ifIphoneX } from '../utils';
import colors from './colors';
import constants from './constants';

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  contentText: {
    fontSize: 24,
    lineHeight: 28,
    color: colors.black,
    alignSelf: 'flex-start',
    letterSpacing: -0.2,
    paddingTop: 40,
    paddingBottom: 20,
  },
  foreground: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
  },
  background: {
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: colors.primaryGreen,
    height: '100%',
  },
  headerWrapper: {
    width: '100%',
    // paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? ifIphoneX(50, 0) : 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingTop: 10,
    alignItems: 'center',
  },
  logo: {
    height: 24,
    width: 142,
  },
  message: {
    color: colors.white,
    fontSize: constants.getResponsiveFontSize(32),
    lineHeight: constants.getResponsiveFontSize(32) * 1.2,
    letterSpacing: -1,
  },
  messageContainer: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  profilePic: {
    width: constants.responsiveWidth(18),
    height: constants.responsiveWidth(18),
    borderRadius: constants.responsiveWidth(4.5),
  },
  foregroundText: {
    color: colors.white,
  },
});

export default screenStyles;
