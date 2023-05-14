using System.Collections.Generic;
using System.Threading.Tasks;
using _org_._proj_._mod_.Core.Aggregates._aggregate_s;

using MongoDB.Entities;

namespace _org_._proj_._mod_.Tests
{
    public class TestData
    {
        public static List<_aggregate_> _aggregate_s = new()
        {
            new _aggregate_("test")
        };

        public class _637632330490465147_TestDataMigration : DbMigration
        {
            public override async Task UpgradeAsync(DbContext dbContext)
            {
                dbContext.Attach(_aggregate_s);
                await _aggregate_s.SaveAsync();
            }
        }
    }
}
