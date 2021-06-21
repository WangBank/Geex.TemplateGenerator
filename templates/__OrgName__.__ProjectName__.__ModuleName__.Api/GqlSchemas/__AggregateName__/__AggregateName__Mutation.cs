using System.Threading.Tasks;
using __OrgName__.__ProjectName__.__ModuleName__.Api.GqlSchemas.__AggregateName__.Inputs;
using Geex.Common.Gql.Roots;
using HotChocolate;
using HotChocolate.Types;
using MongoDB.Entities;

namespace __OrgName__.__ProjectName__.__ModuleName__.Api.GqlSchemas.__AggregateName__
{
    [ExtendObjectType(nameof(Mutation))]
    public class __AggregateName__Mutation : Mutation
    {
        /// <summary>
        /// 更新设置
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<bool> Update__AggregateName__(
            [Service] DbContext dbContext,
            Update__AggregateName__Input input)
        {
            var entity = await dbContext.Find<Core.__AggregateName__s.__AggregateName__>().Match(x=>x.Name == input.Name).ExecuteFirstAsync();
            entity.Name = input.NewName;
            await entity.SaveAsync();
            return true;
        }
    }
}
