import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

const inAppUpdates = new SpInAppUpdates(true);

export const checkForUpdate = async () => {
  try {
    setTimeout(async () => {
      const result = await inAppUpdates.checkNeedsUpdate();

      console.log('UPDATE RESULT =>', result);

      if (result.shouldUpdate) {
        await inAppUpdates.startUpdate({
          updateType: IAUUpdateKind.IMMEDIATE,
        });
      }
    }, 3000);
  } catch (error) {
    console.log('Update error:', error);
  }
};
