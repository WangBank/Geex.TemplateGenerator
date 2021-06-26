using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MyOrg.MyProject.MyModule.Api.Aggregates.MyAggregates;
using MyOrg.MyProject.MyModule.Api.Aggregates.MyAggregates.Inputs;
using MyOrg.MyProject.MyModule.Core.Aggregates;
using MediatR;
using MongoDB.Entities;

namespace MyOrg.MyProject.MyModule.Core.Handlers
{
    public class MyAggregateHandler :
        IRequestHandler<GetMyAggregatesInput, IEnumerable<IMyAggregate>>,
        IRequestHandler<UpdateMyAggregateInput, IMyAggregate>
    {
        public DbContext DbContext { get; }

        public MyAggregateHandler(DbContext dbContext)
        {
            DbContext = dbContext;
        }

        public async Task<IEnumerable<IMyAggregate>> Handle(GetMyAggregatesInput input,
            CancellationToken cancellationToken)
        {
            return await DbContext.Find<MyAggregate>().Match(x => x.Name == input.Name)
                .ExecuteAsync(cancellationToken);
        }

        public async Task<IMyAggregate> Handle(UpdateMyAggregateInput input,
            CancellationToken cancellationToken)
        {
            var entity = await DbContext.Find<MyAggregate>().Match(x => x.Name == input.Name)
                .ExecuteFirstAsync(cancellationToken);
            entity.Name = input.NewName;
            return entity;
        }
    }
}
