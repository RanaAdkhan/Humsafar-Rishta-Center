# ProGuard rules for Humsafar Rishta Center (Capacitor + React App)

# Preserve WebView JavaScript Interfaces
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Preserve Capacitor Native Plugins
-keep public class * extends com.getcapacitor.Plugin {
    *;
}
-keep public class com.getcapacitor.** { *; }

# Preserve AndroidX Splash Screen
-keep class androidx.core.splashscreen.** { *; }

# Preserve Cordova compatibility plugins
-keep class org.apache.cordova.** { *; }

# Obfuscation & Line Numbers for crash logs
-keepattributes SourceFile,LineNumberTable,*Annotation*
-renamesourcefileattribute SourceFile

# Remove debug logs in release build
-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int d(...);
    public static int i(...);
    public static int w(...);
}
