import TouchID from 'react-native-touch-id';

// This file was generated by Mendix Studio Pro.
// BEGIN EXTRA CODE
// END EXTRA CODE
/**
 * @returns {Promise.<boolean>}
 */
async function IsBiometricAuthenticationSupported() {
    // BEGIN USER CODE
    // Documentation https://github.com/naoufal/react-native-touch-id
    return TouchID.isSupported()
        .then(() => true)
        .catch(() => false);
    // END USER CODE
}

export { IsBiometricAuthenticationSupported };