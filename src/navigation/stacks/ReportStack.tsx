import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportScreen from '../../screen/report/ReportScreen';
import ReportHistoryScreen from '../../screen/report/reportHistory/ReportHistoryScreen';

const Stack = createNativeStackNavigator();

const ReportStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="ReportHistory" component={ReportHistoryScreen} />
    </Stack.Navigator>
  );
};

export default ReportStack;
