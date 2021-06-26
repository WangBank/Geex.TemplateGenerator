using Geex.Common.Settings.Abstraction;

namespace MyOrg.MyProject.MyModule.Api
{
    public class MyModuleSettings : SettingDefinition
    {
        public MyModuleSettings(string name,
            object? defaultValue,
            SettingScopeEnumeration[] validScopes = default,
            string? description = null,
            bool isHiddenForClients = false) : base(nameof(MyModule) + name, defaultValue, validScopes, description, isHiddenForClients)
        {
        }
        public static MyModuleSettings ModuleName { get; } = new(nameof(ModuleName), "MyModule");

    }
}
