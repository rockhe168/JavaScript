using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Backbone
{
    /// <summary>
    /// collectionService 的摘要说明
    /// </summary>
    public class collectionService : IHttpHandler
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
                context.Response.Write("[{\"title\":\"Java高级编程\"},{\"title\":\"C#高级编程\"},{\"title\":\"JavaScript高级编程\"}]");
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
}