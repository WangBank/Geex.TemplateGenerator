using System.Collections.Generic;
using System.Threading.Tasks;
using __OrgName__.__ProjectName__.__ModuleName__.Api.GqlSchemas.__AggregateName__.Inputs;
using Geex.Common.Gql.Roots;
using HotChocolate;
using HotChocolate.Types;
using MongoDB.Entities;

namespace __OrgName__.__ProjectName__.__ModuleName__.Api.GqlSchemas.__AggregateName__
{
    [ExtendObjectType(nameof(Query))]
    public class __AggregateName__Query : Query
    {
        /// <summary>
        /// 根据provider获取全量设置
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public async Task<List<Core.__AggregateName__s.__AggregateName__>> __AggregateName__s(
            [Service] DbContext dbContext,
            Get__AggregateName__sInput input)
        {
            var result = await dbContext.Find<Core.__AggregateName__s.__AggregateName__>().Match(x => x.Name == input.Name).ExecuteAsync();
            return result;
        }
    }
}
