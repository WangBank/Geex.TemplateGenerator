using System.Linq;
using MediatR;

namespace __OrgName__.__ProjectName__.__ModuleName__.Api.Aggregates.__AggregateName__s.Inputs
{
    public class Get__AggregateName__sInput:IRequest<IQueryable<I__AggregateName__>>
    {
        public string Name { get; set; }
    }
}