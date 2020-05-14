 am = context.getSystemService(context.ACTIVITY_SERVICE);
 cn = am.getRunningTasks(1).get(0).topActivity;
 log("------------------------\n包名:",cn.getPackageName(),"\n页面:",cn.getClassName(),"\n-------------------------------")
console.log(am.getRunningTasks(1).get(0));

 var mPackageManager = context.getPackageManager()
 // var appList=pm.getInstalledApplications(0)
 latestPackageStr=cn.getPackageName()
 latestClassStr=cn.getClassName()
 componentName = new android.content.ComponentName('org.autojs.autojs', 'org.autojs.autojs.ui.main.MainActivity_')
// mLatestActivity = mPackageManager.getActivityInfo(componentName, 0);
mLatestActivity = mPackageManager.getActivityInfo(componentName, 1);
log(mLatestActivity)
