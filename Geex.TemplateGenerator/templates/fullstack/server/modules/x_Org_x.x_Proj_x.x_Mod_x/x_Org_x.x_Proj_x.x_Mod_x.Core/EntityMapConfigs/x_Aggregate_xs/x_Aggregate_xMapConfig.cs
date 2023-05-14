using Geex.Common.Abstraction;
using MongoDB.Bson.Serialization;
using x_Org_x.x_Proj_x.x_Mod_x.Core.Aggregates._aggregate_s;

namespace x_Org_x.x_Proj_x.x_Mod_x.Core.EntityMapConfigs._aggregate_s
{
    public class _aggregate_MapConfig : EntityMapConfig<x_Aggregate_x>
    {
        public override void Map(BsonClassMap<x_Aggregate_x> map)
        {
            map.SetIsRootClass(true);
            map.Inherit<x_Aggregate_x>();
            map.AutoMap();
        }
    }
}
