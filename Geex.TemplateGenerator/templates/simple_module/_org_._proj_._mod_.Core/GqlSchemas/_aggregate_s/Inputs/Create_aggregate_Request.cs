using _org_._proj_._mod_.Core.Aggregates._aggregate_s;
using MediatR;

namespace _org_._proj_._mod_.Core.GqlSchemas._aggregate_s.Inputs
{
    public class Create_aggregate_Request : IRequest<_aggregate_>
    {
        public string Name { get; set; }
    }
}
