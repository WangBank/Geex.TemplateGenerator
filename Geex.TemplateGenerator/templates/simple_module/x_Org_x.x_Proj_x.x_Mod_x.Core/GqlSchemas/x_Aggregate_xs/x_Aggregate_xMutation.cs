using System.Linq;
using System.Threading.Tasks;
using _org_._proj_._mod_.Core.Aggregates._aggregate_s;
using _org_._proj_._mod_.Core.GqlSchemas._aggregate_s.Inputs;
using Geex.Common.Abstraction.Gql.Types;
using MongoDB.Entities;

namespace _org_._proj_._mod_.Core.GqlSchemas._aggregate_s
{
    public class _aggregate_Mutation : MutationExtension<_aggregate_Mutation>
    {
        private readonly DbContext _dbContext;

        public _aggregate_Mutation(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        /// <summary>
        /// 创建_aggregate_
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<_aggregate_> Create_aggregate_(
            Create_aggregate_Request input)
        {
            var entity = new _aggregate_(input.Name);
            return _dbContext.Attach(entity);
        }

        /// <summary>
        /// 编辑_aggregate_
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<bool> Edit_aggregate_(Edit_aggregate_Request input)
        {
            var entity = _dbContext.Queryable<_aggregate_>().FirstOrDefault(x=>x.Id == input.Id);
            entity.Name = input.Name;
            return true;
        }

        /// <summary>
        /// 删除_aggregate_
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<bool> Delete_aggregate_(
            Delete_aggregate_Request input)
        {
            await _dbContext.DeleteAsync<_aggregate_>(x=>input.Ids.Contains(x.Id));
            return true;
        }
    }
}
