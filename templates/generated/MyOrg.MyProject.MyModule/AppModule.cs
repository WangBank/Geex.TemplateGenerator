using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MyOrg.MyProject.MyModule.Api;
using MyOrg.MyProject.MyModule.Core;

using Geex.Common;
using Geex.Common.Abstractions;
using Geex.Common.Settings;

using Volo.Abp.Modularity;

namespace MyOrg.MyProject.MyModule
{
    [DependsOn(
        typeof(GeexCommonModule),
        typeof(MyProjectMyModuleCoreModule),
        typeof(MyProjectMyModuleApiModule)
        )]
    public class AppModule : GeexEntryModule<AppModule>
    {

    }
}
