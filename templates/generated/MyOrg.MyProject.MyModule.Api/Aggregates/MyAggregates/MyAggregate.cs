namespace MyOrg.MyProject.MyModule.Api.Aggregates.MyAggregates
{
    /// <summary>
    /// this is a aggregate root of this module, we name it the same as the module feel free to change it to its real name
    /// </summary>
    public interface IMyAggregate
    {
        public string Name { get; set; }
    }
}
