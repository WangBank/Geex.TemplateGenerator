using Geex.Common.Abstraction.Storage;

namespace _org_._proj_._mod_.Core.Aggregates._aggregate_s
{
    /// <summary>
    /// this is a aggregate root of this module, we name it the same as the module feel free to change it to its real name
    /// </summary>
    public class _aggregate_ : Entity<_aggregate_>
    {
        public _aggregate_(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
}
