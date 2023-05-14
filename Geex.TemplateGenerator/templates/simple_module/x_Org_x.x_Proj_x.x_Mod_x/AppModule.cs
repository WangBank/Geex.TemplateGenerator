using _org_._proj_._mod_.Core;

using Geex.Common;
using Geex.Common.Abstractions;

using Volo.Abp.Modularity;

namespace _org_._proj_._mod_ {
    [DependsOn(
        typeof(GeexCommonModule),
        typeof(_proj__mod_CoreModule)
        )]
    public class AppModule : GeexEntryModule<AppModule> {

    }
}
