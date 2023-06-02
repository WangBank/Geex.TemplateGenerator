using System.Collections.Generic;
using System.Threading.Tasks;
using _org_._proj_._mod_.Core.Aggregates.x_Aggregate_xs;

using MongoDB.Entities;

namespace _org_._proj_._mod_.Tests
{
    public class TestData
    {
        public static List<_aggregate_> x_aggregate_xs = new()
        {
            new x_Aggregate_x("test")
        };

        public class _637632330490465147_TestDataMigration : DbMigration
        {
            public override async Task UpgradeAsync(DbContext dbContext)
            {
                dbContext.Attach(x_aggregate_xs);
                await x_aggregate_xs.SaveAsync();
            }
        }
    }
}
