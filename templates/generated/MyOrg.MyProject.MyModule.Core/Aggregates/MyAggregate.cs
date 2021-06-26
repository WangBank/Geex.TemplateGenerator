using MyOrg.MyProject.MyModule.Api.Aggregates.MyAggregates;
using Geex.Common.Abstractions;

namespace MyOrg.MyProject.MyModule.Core.Aggregates
{
    /// <summary>
    /// this is a aggregate root of this module, we name it the same as the module feel free to change it to its real name
    /// </summary>
    public class MyAggregate : Entity, IMyAggregate
    {
        public string Name { get; set; }
    }
}
