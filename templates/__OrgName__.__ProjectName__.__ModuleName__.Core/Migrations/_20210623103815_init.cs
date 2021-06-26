using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Entities;
using __OrgName__.__ProjectName__.__ModuleName__.Core.Aggregates;

namespace __OrgName__.__ProjectName__.__ModuleName__.Core.Migrations
{
    public class ___TimeSpan___init : IMigration
    {
        public async Task UpgradeAsync(DbContext dbContext)
        {
            var __AggregateName__Entity = new __AggregateName__()
            {
                Name = "__AggregateName__",
            };
            dbContext.AttachContextSession(__AggregateName__Entity);
            await __AggregateName__Entity.SaveAsync();
        }
    }
}
