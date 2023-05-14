using System;
using System.Linq;
using System.Threading.Tasks;
using _org_._proj_._mod_.Core.Aggregates._aggregate_s;
using _org_._proj_._mod_.Core.GqlSchemas._aggregate_s.Inputs;
using _org_._proj_._mod_.Core.GqlSchemas._aggregate_s.Types;
using Geex.Common.Abstraction.Gql.Types;
using HotChocolate.Types;
using MongoDB.Entities;

namespace _org_._proj_._mod_.Core.GqlSchemas._aggregate_s {
    public class _aggregate_Query : QueryExtension<_aggregate_Query> {
        private readonly DbContext _dbContext;

        public _aggregate_Query(DbContext dbContext) {
            _dbContext = dbContext;
        }
        protected override void Configure(IObjectTypeDescriptor<_aggregate_Query> descriptor) {
            descriptor.Field(x => x._aggregate_s(default))
            .UseOffsetPaging<_aggregate_GqlType>();
            base.Configure(descriptor);
        }

        /// <summary>
        /// 列表获取_aggregate_
        /// </summary>
        /// <returns></returns>
        public async Task<IQueryable<_aggregate_>> _aggregate_s(Query_aggregate_Request input) {
            var result = _dbContext.Queryable<_aggregate_>()
                .WhereIf(!input.Name.IsNullOrEmpty(), x => x.Name.Contains(input.Name));
            return result;
        }

    }
}
