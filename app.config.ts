import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "CVAPP",
    slug: "Portfolio",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["assets/*"],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.larayad.Portfolio"
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/icon.png",
            backgroundColor: "#ffffff"
        },
        package: "com.larayad.Portfolio"
    },
    web: {
        favicon: "./assets/favicon.png"
    },
    extra: {
        eas: {
            projectId: "110512fe-ca5d-45f3-b9d6-5b7ef038dc23"
        }
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    runtimeVersion: {
        policy: "sdkVersion"
    }
});
