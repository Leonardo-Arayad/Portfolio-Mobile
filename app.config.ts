import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "CVAPP",
    slug: "portfolio",
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
    platforms: ["android"],
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
            projectId: "b884ed16-addb-4615-ba31-c1752db84e43"
        },
    },
    updates: {
        url: "https://u.expo.dev/b884ed16-addb-4615-ba31-c1752db84e43",
        fallbackToCacheTimeout: 0
    },
    runtimeVersion: "1.0.0"
});
