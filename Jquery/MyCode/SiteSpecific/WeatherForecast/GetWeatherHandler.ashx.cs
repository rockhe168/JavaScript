using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JqueryWeb.SiteSpecific.WeatherForecast
{
    using System.IO;
    using System.Net;
    using System.Text;

    /// <summary>
    /// Summary description for GetWeatherHandler
    /// </summary>
    public class GetWeatherHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");

            var actionName = context.Request["action"];

            switch (actionName)
            {
                case "GetWeatherByCityCode":
                    GetWeatherByCityCode(context);
                    break;
                default:
                    break;
            }

        }

        private void GetWeatherByCityCode(HttpContext context)
        {
            var cityCode = context.Request["cityCode"];

            var url = "http://www.weather.com.cn/data/cityinfo/" + cityCode + ".html";

            var webRequest = (HttpWebRequest)WebRequest.Create(url);

            webRequest.Method = "get";
            string resultStr = "";
            using (var streamReader = new StreamReader(webRequest.GetResponse().GetResponseStream(), Encoding.UTF8))
            {
                resultStr = streamReader.ReadToEnd();
            }
            

            context.Response.Write(resultStr);
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