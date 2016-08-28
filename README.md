![](https://github.com/kongdewen1994/kindle_APP/blob/master/docs/logo.jpg)

=========================

Kindle 是一款蓝牙智能健康APP，配合某品牌智能硬件使用，综合于人体称重，新生婴儿称重，人体体脂成份，血压和体温为一体数据分析软件，为日常健康与保健，助您拥有健康的身体，可查看各项的历史记录，让您随时随地了解你及你家人的健康状态。


![](https://github.com/kongdewen1994/kindle_APP/blob/master/docs/Screen.jpg)
=========================

版权声明
------------
本APP只是个人对cordova+ionic+angularjs的学习和研究项目，禁止用于商业用途

主要功能
------------
* 成人秤,成人秤历史记录.
* 婴儿秤,婴儿秤历史记录.
* 血压计,血压计历史记录.
* 温度计,温度计历史记录.

环境要求
------------
* Android系统 android 4.4+
* IOS系统 iOS 7+
* Cordova 5.0.0+

安装/配置
------------
```
//确保电脑已经配置好android或ios的开发环境

//安装cordova 和 ionic 环境
npm install -g cordova ionic

//下载源码
git clone git@github.com:kongdewen1994/kindle_APP.git

//进入项目目录
cd kindle_APP
cd kindle

//搭建开发环境
ionic platform add android
ionic platform add ios

//下载安装插件
cordova plugin add cordova-plugin-bluetoothle
cordova plugin add cordova-plugin-app-version
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-compat
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-file-opener2
cordova plugin add cordova-plugin-file-transfer
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-x-toast

//usb真机运行
ionic run android
ionic run ios


//如果ionic run报错，请将导入项目到 android studio 或 xcode 进行编译打包
//（编译打包之前执行 ionic prepare android / ionic prepare ios） 
```

开发者
----------
- [Devon](https://github.com/kongdewen1994)
- QQ: 849996781
- email: k849996781@vip.qq.com

支付宝捐赠(左) / 微信捐赠(右)
----------
![](https://github.com/kongdewen1994/kindle_APP/blob/master/docs/zfb.jpg)                  ![](https://github.com/kongdewen1994/kindle_APP/blob/master/docs/wx.jpg)


额外
----------
- IOS版本打包需要证书，需要安装ios版本的请导入到xcode真机调试
- Android 下载 ：http://www.devonhello.com/upload/kindle.apk

