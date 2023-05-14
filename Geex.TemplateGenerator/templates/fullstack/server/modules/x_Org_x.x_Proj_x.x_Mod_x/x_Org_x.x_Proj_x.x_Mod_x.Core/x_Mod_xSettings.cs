using System.Text.Json.Nodes;
using Geex.Common.Settings.Abstraction;

namespace x_Org_x.x_Proj_x.x_Mod_x.Core
{
    public class _mod_Settings : SettingDefinition
    {
        public _mod_Settings(string name,
            SettingScopeEnumeration[] validScopes = default,
            string description = null,
            JsonNode defaultValue = null,
            bool isHiddenForClients = false) : base(nameof(x_Mod_x) + name, validScopes, description, isHiddenForClients, defaultValue)
        {
        }
        public static _mod_Settings ModuleName { get; } = new(nameof(ModuleName), new[] { SettingScopeEnumeration.Global, }, "name of this module", "_mod_");

    }
}
