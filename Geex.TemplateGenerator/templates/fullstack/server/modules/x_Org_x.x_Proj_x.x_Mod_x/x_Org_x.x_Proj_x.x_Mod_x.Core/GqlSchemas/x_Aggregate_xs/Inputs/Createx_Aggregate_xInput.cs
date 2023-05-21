using MediatR;
using x_Org_x.x_Proj_x.x_Mod_x.Core.Aggregates._aggregate_s;

namespace x_Org_x.x_Proj_x.x_Mod_x.Core.GqlSchemas.x_Aggregate_xs.Inputs
{
    public class Createx_Aggregate_xInput : IRequest<x_Aggregate_x>
    {
        public string Name { get; set; }
    }
}
