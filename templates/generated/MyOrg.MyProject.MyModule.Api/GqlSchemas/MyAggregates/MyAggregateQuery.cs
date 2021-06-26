using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyOrg.MyProject.MyModule.Api.Aggregates.MyAggregates;
using MyOrg.MyProject.MyModule.Api.Aggregates.MyAggregates.Inputs;
using Geex.Common.Gql.Roots;
using HotChocolate;
using HotChocolate.Types;
using MongoDB.Entities;

namespace MyOrg.MyProject.MyModule.Api.GqlSchemas.MyAggregates
{
    [ExtendObjectType(nameof(Query))]
    public class MyAggregateQuery : Query
    {
        /// <summary>
        /// 根据provider获取全量设置
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public async Task<IQueryable<IMyAggregate>> MyAggregates(
            GetMyAggregatesInput input)
        {
            var result = await Mediator.Send(input);
            return result;
        }
    }
}
