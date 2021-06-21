using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using __OrgName__.__ProjectName__.__ModuleName__.Api;
using __OrgName__.__ProjectName__.__ModuleName__.Module;
using Autofac.Extensions.DependencyInjection;
using GeexBox.ElasticSearch.Zero.Logging.Elasticsearch;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.DependencyInjection;

namespace __OrgName__.__ProjectName__.__ModuleName__
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                .ConfigureLogging((ctx, builder) =>
                {
                    if (ctx.Configuration.GetSection("Logging:Elasticsearch").GetChildren().Any())
                    {
                        builder.AddElasticsearch();
                    }
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureServices((_, services) =>
                    {
                        services.AddGeexGraphQL<__ProjectName____ModuleName__ApiModule>();
                    });
                    webBuilder.Configure((webHostBuilderContext, app) => { app.InitializeApplication(); });
                });
    }
}
