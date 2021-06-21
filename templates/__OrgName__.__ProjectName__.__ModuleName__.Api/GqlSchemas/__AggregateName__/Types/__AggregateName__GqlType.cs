using HotChocolate.Types;

namespace __OrgName__.__ProjectName__.__ModuleName__.Api.GqlSchemas.__AggregateName__.Types
{
    public class __AggregateName__GqlType : ObjectType<Core.__AggregateName__s.__AggregateName__>
    {
        protected override void Configure(IObjectTypeDescriptor<Core.__AggregateName__s.__AggregateName__> descriptor)
        {
            // Implicitly binding all fields, if you want to bind fields explicitly, read more about hot chocolate
            descriptor.BindFieldsImplicitly();
            base.Configure(descriptor);
        }
    }
}
