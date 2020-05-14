importClass(android.net.Uri);
importClass(android.content.ContentValues);
//轮子地址
//https://blog.csdn.net/alittleforward/article/details/40949669


var values = new ContentValues();
values.put("address", "10001");
//1为收 2为发
values.put("type", "2");
//阅读状态，0未读1已读
values.put("read", "0");
values.put("body", "10001");
values.put("person", "test");
context.getApplicationContext().getContentResolver().insert(Uri.parse("content://sms/inbox"), values);