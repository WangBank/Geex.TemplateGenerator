using System.Threading.Tasks;
using MyOrg.MyProject.MyModule.Api.Aggregates.MyAggregates;
using MyOrg.MyProject.MyModule.Api.Aggregates.MyAggregates.Inputs;
using Geex.Common.Gql.Roots;
using HotChocolate;
using HotChocolate.Types;
using MongoDB.Entities;

namespace MyOrg.MyProject.MyModule.Api.GqlSchemas.MyAggregates
{
    [ExtendObjectType(nameof(Mutation))]
    public class MyAggregateMutation : Mutation
    {
        /// <summary>
        /// 更新设置
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<IMyAggregate> UpdateMyAggregate(
            UpdateMyAggregateInput input)
        {
            var result = await Mediator.Send(input);
            return result;
        }
    }
}
