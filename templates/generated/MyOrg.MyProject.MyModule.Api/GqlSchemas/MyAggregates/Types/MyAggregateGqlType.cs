using MyOrg.MyProject.MyModule.Api.Aggregates.MyAggregates;
using HotChocolate.Types;

namespace MyOrg.MyProject.MyModule.Api.GqlSchemas.MyAggregates.Types
{
    public class MyAggregateGqlType : ObjectType<IMyAggregate>
    {
        protected override void Configure(IObjectTypeDescriptor<IMyAggregate> descriptor)
        {
            // Implicitly binding all fields, if you want to bind fields explicitly, read more about hot chocolate
            descriptor.BindFieldsImplicitly();
            base.Configure(descriptor);
        }
    }
}
