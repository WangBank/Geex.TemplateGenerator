using MediatR;

namespace MyOrg.MyProject.MyModule.Api.Aggregates.MyAggregates.Inputs
{
    public class UpdateMyAggregateInput:IRequest<IMyAggregate>
    {
        public string Name { get; set; }
        public string NewName { get; set; }
    }
}
