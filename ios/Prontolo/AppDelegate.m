/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Prontolo"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  
  
  for (NSString *familyName in [UIFont familyNames]){
    NSLog(@"Family name: %@", familyName);
    for (NSString *fontName in [UIFont fontNamesForFamilyName:familyName]) {
      if([fontName.lowercaseString containsString:@"Lato".lowercaseString])
        NSLog(@"--Font name: %@", fontName);
    }
  }
//  [FIRApp configure];
//  [FIRMessaging messaging].delegate = self;
  
//  if ([UNUserNotificationCenter class] != nil) {
//    // iOS 10 or later
//    // For iOS 10 display notification (sent via APNS)
//    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
//    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
//    UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
//    [[UNUserNotificationCenter currentNotificationCenter]
//     requestAuthorizationWithOptions:authOptions
//     completionHandler:^(BOOL granted, NSError * _Nullable error) {
//       // ...
//     }];
//  } else {
//    // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
//    UIUserNotificationType allNotificationTypes =
//    (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
//    UIUserNotificationSettings *settings =
//    [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
//    [application registerUserNotificationSettings:settings];
//  }
//  
//  [application registerForRemoteNotifications];
  
  return YES;
}

//- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
//  NSLog(@"FCM registration token: %@", fcmToken);
//  // Notify about received token.
//  NSDictionary *dataDict = [NSDictionary dictionaryWithObject:fcmToken forKey:@"token"];
//  [[NSNotificationCenter defaultCenter] postNotificationName:
//   @"FCMToken" object:nil userInfo:dataDict];
//  // TODO: If necessary send token to application server.
//  // Note: This callback is fired at each app startup and whenever a new token is generated.
//}
//
//- (void)application:(UIApplication *)application
//didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
//  [FIRMessaging messaging].APNSToken = deviceToken;
//}

@end
