using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace JqueryWeb.SiteSpecific._2
{
    /// <summary>
    /// Summary description for UserInfoHandler
    /// </summary>
    public class UserInfoHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");


            //接受出过来的Json值  
            string jsonStr = context.Request["userinfo"].ToString();

            //实例化JavaScriptSerializer对象
            JavaScriptSerializer jsSerialize = new JavaScriptSerializer();

            List<UserInfo> objectList = new List<UserInfo>();

            //把json转换其他list<array>类型
            objectList = jsSerialize.Deserialize(jsonStr, typeof(List<UserInfo>)) as List<UserInfo>;

            foreach (var userInfo in objectList)
            {
                System.Diagnostics.Debug.WriteLine("Id="+userInfo.Id+"--->Name:"+userInfo.Name+"--->Time:"+userInfo.Time);
            }
           
            context.Response.Write("success");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }


    public class UserInfo
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime Time { get; set; }
    }
}