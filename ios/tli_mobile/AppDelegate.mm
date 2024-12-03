#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"tli_mobile";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Linking API
- (BOOL) application: (UIApplication *)application
              openURL: (NSURL *)url
              options: (NSDictionary<UIApplicationOpenURLOptionsKey, id> *) options
 {
   if ([self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:url]) {
     return YES;
   }
   return [RCTLinkingManager application:application openURL:url options:options];
}

// Universal Links
- (BOOL) application: (UIApplication *) application
continueUserActivity: (nonnull NSUserActivity *)userActivity
   restorationHandler: (nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
 {
   if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
     if (self.authorizationFlowManagerDelegate) {
       BOOL resumableAuth = [self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:userActivity.webpageURL];
       if (resumableAuth) {
         return YES;
       }
     }
   }
   return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
 }

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  return [super application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  return [super application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  return [super application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}


@end
