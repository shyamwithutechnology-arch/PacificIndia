import React, { ReactNode, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';

type ScreenLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
  scroll?: boolean;
  paddingHorizontalStyle?: number;
  innerContainer?: StyleProp<ViewStyle>;
  statusBarBgColor?: string;
};

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  header,
  scroll = false,
  paddingHorizontalStyle,
  innerContainer,
  statusBarBgColor = '#0093D3',
}) => {
  const theme = useAppTheme();
  const { tokens } = theme;
  const styles = createStyles(theme);

  const [headerHeight, setHeaderHeight] = useState(0);

  const horizontalPadding =
    paddingHorizontalStyle !== undefined
      ? paddingHorizontalStyle
      : tokens.spacing.md;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#0093D3'} />

      {/* Header */}
      <SafeAreaView
        edges={['top']}
        style={{ backgroundColor: statusBarBgColor }}
      >
        {header}
      </SafeAreaView>

      {scroll ? (
        <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={100}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            innerContainer,
            { paddingHorizontal: horizontalPadding },
          ]}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View
          style={[
            styles.flex,
            innerContainer,
            { paddingHorizontal: horizontalPadding },
          ]}
        >
          {children}
        </View>
      )}
    </>
  );
};
// import React, { ReactNode, useState } from 'react';
// import {
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar,
//   StyleProp,
//   ViewStyle,
// } from 'react-native';
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
// import { useAppTheme } from '../../hooks/useAppTheme';
// import { createStyles } from './styles';

// type ScreenLayoutProps = {
//   children: ReactNode;
//   header?: ReactNode;
//   scroll?: boolean;
//   paddingHorizontalStyle?: number;
//   innerContainer?: StyleProp<ViewStyle>;
//   statusBarBgColor?: string;
// };

// export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
//   children,
//   header,
//   scroll = false,
//   paddingHorizontalStyle,
//   innerContainer,
//   statusBarBgColor = '#0093D3',
// }) => {
//   const theme = useAppTheme();
//   const { tokens } = theme;
//   const styles = createStyles(theme);

//   const [headerHeight, setHeaderHeight] = useState(0);

//   const horizontalPadding =
//     paddingHorizontalStyle !== undefined
//       ? paddingHorizontalStyle
//       : tokens.spacing.md;

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor={'#0093D3'} />

//       {/* Header */}
//       <SafeAreaView
//         edges={['top']}
//         style={{ backgroundColor: statusBarBgColor }}
//       >
//         {header}
//       </SafeAreaView>

//       <View style={styles.container}>
//         <KeyboardAvoidingView
//           style={styles.flex}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//           {/* Content */}
//           {scroll ? (
//             <ScrollView
//               style={styles.flex}
//               contentContainerStyle={[
//                 innerContainer,
//                 {
//                   paddingHorizontal: horizontalPadding,
//                 },
//               ]}
//               showsVerticalScrollIndicator={false}
//               keyboardShouldPersistTaps="always"
//               nestedScrollEnabled
//             >
//               {children}
//             </ScrollView>
//           ) : (
//             <View
//               style={[
//                 styles.flex,
//                 innerContainer,
//                 {
//                   paddingHorizontal: horizontalPadding,
//                 },
//               ]}
//             >
//               {children}
//             </View>
//           )}
//         </KeyboardAvoidingView>
//       </View>
//     </>
//   );
// };
