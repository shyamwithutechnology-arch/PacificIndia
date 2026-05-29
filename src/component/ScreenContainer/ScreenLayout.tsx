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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={statusBarBgColor} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <SafeAreaView edges={['top', 'left', 'right']}>{header}</SafeAreaView>

        {/* Content */}
        {scroll ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[
              innerContainer,
              {
                paddingHorizontal: horizontalPadding,
              },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled
          >
            {children}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.flex,
              innerContainer,
              {
                paddingHorizontal: horizontalPadding,
              },
            ]}
          >
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

// import React from 'react';
// import {
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar,
//   StyleSheet,
// } from 'react-native';
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
// import { useAppTheme } from '../../hooks/useAppTheme';
// import { createStyles } from './styles';

// export const ScreenLayout = ({
//   children,
//   header,
//   scroll = false,
//   paddingHorizontalStyle,
//   innerContainer,
// }) => {
//   const theme = useAppTheme();
//   const { tokens } = theme;
//   const insets = useSafeAreaInsets();
//   const styles = createStyles(theme);

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle={'dark-content'} backgroundColor="transparent" />

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         {/* 2. Header: Usually outside the scroll but inside SafeArea */}
//         <SafeAreaView edges={['top', 'left', 'right']}>{header}</SafeAreaView>

//         {/* 3. Content Logic */}
//         {scroll ? (
//           <ScrollView
//             style={styles.flex}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{
//               flexGrow: 1,
//               paddingHorizontal:
//                 paddingHorizontalStyle !== undefined
//                   ? paddingHorizontalStyle
//                   : tokens.spacing.md,
//               // Only apply bottom inset here to clear home indicator/tab bars
//               paddingBottom: insets.bottom + tokens.spacing.lg,
//             }}
//           >
//             {children}
//           </ScrollView>
//         ) : (
//           <View
//             style={[
//               styles.flex,
//               innerContainer,
//               {
//                 paddingHorizontal:
//                   paddingHorizontalStyle !== 0 ? tokens.spacing.md : 0,
//                 paddingBottom: insets.bottom + tokens.spacing.xxl,
//               },
//             ]}
//           >
//             {children}
//           </View>
//         )}
//       </KeyboardAvoidingView>
//     </View>
//   );
// };
