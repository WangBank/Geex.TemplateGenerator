using MediatR;

namespace __OrgName__.__ProjectName__.__ModuleName__.Api.Aggregates.__AggregateName__s.Inputs
{
    public class Update__AggregateName__Input:IRequest<I__AggregateName__>
    {
        public string Name { get; set; }
        public string NewName { get; set; }
    }
}