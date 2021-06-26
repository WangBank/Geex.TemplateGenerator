using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using __OrgName__.__ProjectName__.__ModuleName__.Api;
using __OrgName__.__ProjectName__.__ModuleName__.Core;

using Geex.Common;
using Geex.Common.Abstractions;
using Geex.Common.Settings;

using Volo.Abp.Modularity;

namespace __OrgName__.__ProjectName__.__ModuleName__
{
    [DependsOn(
        typeof(GeexCommonModule),
        typeof(__ProjectName____ModuleName__CoreModule),
        typeof(__ProjectName____ModuleName__ApiModule)
        )]
    public class AppModule : GeexEntryModule<AppModule>
    {

    }
}
