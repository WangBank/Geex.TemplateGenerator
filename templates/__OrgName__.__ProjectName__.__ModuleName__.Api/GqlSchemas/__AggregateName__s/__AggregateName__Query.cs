using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using __OrgName__.__ProjectName__.__ModuleName__.Api.Aggregates.__AggregateName__s;
using __OrgName__.__ProjectName__.__ModuleName__.Api.Aggregates.__AggregateName__s.Inputs;
using Geex.Common.Gql.Roots;
using HotChocolate;
using HotChocolate.Types;
using MongoDB.Entities;

namespace __OrgName__.__ProjectName__.__ModuleName__.Api.GqlSchemas.__AggregateName__s
{
    [ExtendObjectType(nameof(Query))]
    public class __AggregateName__Query : Query
    {
        /// <summary>
        /// 根据provider获取全量设置
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public async Task<IQueryable<I__AggregateName__>> __AggregateName__s(
            Get__AggregateName__sInput input)
        {
            var result = await Mediator.Send(input);
            return result;
        }
    }
}
