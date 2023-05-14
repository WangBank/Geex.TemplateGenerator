
using System.Collections.Generic;
using MediatR;

namespace x_Org_x.x_Proj_x.x_Mod_x.Core.GqlSchemas.x_Aggregate_xs.Inputs
{
    public class Deletex_Aggregate_xRequest : IRequest<Unit>
    {
        public List<string> Ids { get; set; }
    }
}