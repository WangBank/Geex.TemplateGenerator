using _org_._proj_._mod_.Core.Aggregates._aggregate_s;
using HotChocolate.Types;

namespace _org_._proj_._mod_.Core.GqlSchemas._aggregate_s.Types
{
    public class _aggregate_GqlType : ObjectType<_aggregate_>
    {
        protected override void Configure(IObjectTypeDescriptor<_aggregate_> descriptor)
        {
            // Implicitly binding all fields, if you want to bind fields explicitly, read more about hot chocolate
            descriptor.BindFieldsImplicitly();
            base.Configure(descriptor);
        }
    }
}
