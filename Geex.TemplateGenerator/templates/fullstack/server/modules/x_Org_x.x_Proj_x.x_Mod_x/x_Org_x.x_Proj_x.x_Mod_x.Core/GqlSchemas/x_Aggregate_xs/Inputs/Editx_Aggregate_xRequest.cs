using MediatR;

namespace x_Org_x.x_Proj_x.x_Mod_x.Core.GqlSchemas.x_Aggregate_xs.Inputs
{
    public class Editx_Aggregate_xRequest : IRequest<Unit>
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}