using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using __OrgName__.__ProjectName__.__ModuleName__.Api.Aggregates.__AggregateName__s;
using __OrgName__.__ProjectName__.__ModuleName__.Api.Aggregates.__AggregateName__s.Inputs;
using __OrgName__.__ProjectName__.__ModuleName__.Core.Aggregates;
using MediatR;
using MongoDB.Entities;

namespace __OrgName__.__ProjectName__.__ModuleName__.Core.Handlers
{
    public class __AggregateName__Handler :
        IRequestHandler<Get__AggregateName__sInput, IEnumerable<I__AggregateName__>>,
        IRequestHandler<Update__AggregateName__Input, I__AggregateName__>
    {
        public DbContext DbContext { get; }

        public __AggregateName__Handler(DbContext dbContext)
        {
            DbContext = dbContext;
        }

        public async Task<IEnumerable<I__AggregateName__>> Handle(Get__AggregateName__sInput input,
            CancellationToken cancellationToken)
        {
            return await DbContext.Find<__AggregateName__>().Match(x => x.Name == input.Name)
                .ExecuteAsync(cancellationToken);
        }

        public async Task<I__AggregateName__> Handle(Update__AggregateName__Input input,
            CancellationToken cancellationToken)
        {
            var entity = await DbContext.Find<__AggregateName__>().Match(x => x.Name == input.Name)
                .ExecuteFirstAsync(cancellationToken);
            entity.Name = input.NewName;
            return entity;
        }
    }
}
