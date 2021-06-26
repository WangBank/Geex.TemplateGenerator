using Geex.Common.Settings.Abstraction;

namespace __OrgName__.__ProjectName__.__ModuleName__.Api
{
    public class __ModuleName__Settings : SettingDefinition
    {
        public __ModuleName__Settings(string name,
            object? defaultValue,
            SettingScopeEnumeration[] validScopes = default,
            string? description = null,
            bool isHiddenForClients = false) : base(nameof(__ModuleName__) + name, defaultValue, validScopes, description, isHiddenForClients)
        {
        }
        public static __ModuleName__Settings ModuleName { get; } = new(nameof(ModuleName), "__ModuleName__");

    }
}
