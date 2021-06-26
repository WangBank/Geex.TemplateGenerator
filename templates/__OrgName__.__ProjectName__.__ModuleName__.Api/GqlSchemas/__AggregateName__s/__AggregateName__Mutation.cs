using System.Threading.Tasks;
using __OrgName__.__ProjectName__.__ModuleName__.Api.Aggregates.__AggregateName__s;
using __OrgName__.__ProjectName__.__ModuleName__.Api.Aggregates.__AggregateName__s.Inputs;
using Geex.Common.Gql.Roots;
using HotChocolate;
using HotChocolate.Types;
using MongoDB.Entities;

namespace __OrgName__.__ProjectName__.__ModuleName__.Api.GqlSchemas.__AggregateName__s
{
    [ExtendObjectType(nameof(Mutation))]
    public class __AggregateName__Mutation : Mutation
    {
        /// <summary>
        /// 更新设置
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<I__AggregateName__> Update__AggregateName__(
            Update__AggregateName__Input input)
        {
            var result = await Mediator.Send(input);
            return result;
        }
    }
}
