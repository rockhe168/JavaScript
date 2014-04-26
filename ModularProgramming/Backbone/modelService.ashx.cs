using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Backbone
{
    /// <summary>
    /// modelService 的摘要说明
    /// </summary>
    public class modelService : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            // Post方式下，取得client端传过来的数据  
            if ("post".Equals(context.Request.HttpMethod.ToLower()))
            {
                StreamReader reader = new StreamReader(context.Request.InputStream);
                string json = HttpUtility.UrlDecode(reader.ReadToEnd());
                context.Response.Write(json);
            }
            // Get方式下，取得client端传过来的数据  
            else
            {
                // 注意，这个是需要解码的  
                //string json = HttpUtility.UrlDecode(context.Request.QueryString.ToString());
                //context.Response.Write(json);

                context.Response.Write("{\"name\":\"fetch调用设置的name\",\"age\":\"30\"}");


            }  

            //context.Response.Write("Hello World");

            //context.Request
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}