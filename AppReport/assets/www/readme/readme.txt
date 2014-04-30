系统开发环境：phonegap-2.8+jquery-2.0+jquerymobile-1.3

锁屏问题：
整个系统屏宽固定为竖屏（AndroidManifest.xml中android:screenOrientation="portrait"），不允许自动调整。

利用OrientationLock插件[https://github.com/cogitor/PhoneGap-OrientationLock]来设置页面屏幕方向（zdCheck中有用到横屏显示更多数据）