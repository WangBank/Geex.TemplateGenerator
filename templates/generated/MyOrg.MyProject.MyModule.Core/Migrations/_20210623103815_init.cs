using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Entities;
using MyOrg.MyProject.MyModule.Core.Aggregates;

namespace Geex.Core.Testing.Core.Migrations
{
    public class _20201231115959_init : IMigration
    {
        public async Task UpgradeAsync(DbContext dbContext)
        {
            var MyAggregateEntity = new MyAggregate()
            {
                Name = "MyAggregate",
            };
            dbContext.AttachContextSession(MyAggregateEntity);
            await MyAggregateEntity.SaveAsync();
        }
    }
}
