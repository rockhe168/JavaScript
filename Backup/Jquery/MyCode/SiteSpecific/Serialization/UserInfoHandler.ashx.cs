using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JqueryWeb.SiteSpecific.Serialization
{
    using System.Web.Script.Serialization;

    /// <summary>
    /// Summary description for UserInfoHandler
    /// </summary>
    public class UserInfoHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            //context.Response.Write("Hello World");

            var request = context.Request;

            if (request.QueryString["Json"] != null)
            {
                // AJAX 异步调用处理程序
                string UserInfo = request.Form["UserInfo"] ?? string.Empty;

                JavaScriptSerializer json = new JavaScriptSerializer();
                Product product = new Product() { Name = "Computer " };

                if (!string.IsNullOrEmpty(UserInfo))
                {
                    // 反序列化
                    var user = json.Deserialize<User>(UserInfo);
                    product.User = user.Name;
                }
                else
                {
                    product.User = "Unknow";
                }
                // 序列化
                string jsonString = json.Serialize(product);

                // 输出异步处理结果
                //Response.ContentType = "application/json";
                context.Response.Write(jsonString);
                context.Response.End();
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }

    [Serializable]
    public class Product
    {
        public string Name;
        public string User;
    }
    public class User
    {
        public string userID { get; set; }
        public string Name { get; set; }
    }
}