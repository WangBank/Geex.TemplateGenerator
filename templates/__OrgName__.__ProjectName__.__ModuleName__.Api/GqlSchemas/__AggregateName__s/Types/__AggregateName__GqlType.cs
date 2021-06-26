using __OrgName__.__ProjectName__.__ModuleName__.Api.Aggregates.__AggregateName__s;
using HotChocolate.Types;

namespace __OrgName__.__ProjectName__.__ModuleName__.Api.GqlSchemas.__AggregateName__s.Types
{
    public class __AggregateName__GqlType : ObjectType<I__AggregateName__>
    {
        protected override void Configure(IObjectTypeDescriptor<I__AggregateName__> descriptor)
        {
            // Implicitly binding all fields, if you want to bind fields explicitly, read more about hot chocolate
            descriptor.BindFieldsImplicitly();
            base.Configure(descriptor);
        }
    }
}
