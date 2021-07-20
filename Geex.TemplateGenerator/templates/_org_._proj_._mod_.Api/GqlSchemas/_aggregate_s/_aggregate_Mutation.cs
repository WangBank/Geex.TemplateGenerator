using System.Threading.Tasks;

using _org_._proj_._mod_.Api.Aggregates._aggregate_s;
using _org_._proj_._mod_.Api.Aggregates._aggregate_s.Inputs;

using Geex.Common.Gql.Roots;

using HotChocolate;
using HotChocolate.Types;

using MediatR;

using MongoDB.Entities;

namespace _org_._proj_._mod_.Api.GqlSchemas._aggregate_s
{
    public class _aggregate_Mutation : QueryTypeExtension<_aggregate_Mutation>
    {
        /// <summary>
        /// 创建_aggregate_
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<I_aggregate_> Create_aggregate_(
            [Service] IMediator mediator,
            Create_aggregate_Request input)
        {
            var result = await mediator.Send(input);
            return result;
        }

        /// <summary>
        /// 编辑_aggregate_
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<bool> Edit_aggregate_(
            [Service] IMediator mediator,
            Edit_aggregate_Request input)
        {
            var result = await mediator.Send(input);
            return true;
        }

        /// <summary>
        /// 删除_aggregate_
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<bool> Delete_aggregate_(
            [Service] IMediator mediator,
            Delete_aggregate_Request input)
        {
            var result = await mediator.Send(input);
            return true;
        }
    }
}
