using System.Linq;
using MediatR;

namespace MyOrg.MyProject.MyModule.Api.Aggregates.MyAggregates.Inputs
{
    public class GetMyAggregatesInput:IRequest<IQueryable<IMyAggregate>>
    {
        public string Name { get; set; }
    }
}
