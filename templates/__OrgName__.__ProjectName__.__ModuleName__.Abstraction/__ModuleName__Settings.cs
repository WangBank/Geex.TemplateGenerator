using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Geex.Common.Settings.Abstraction;
using JetBrains.Annotations;

namespace __OrgName__.__ProjectName__.__ModuleName__.Abstraction
{
    public class __ModuleName__Settings : SettingDefinition
    {
        public __ModuleName__Settings([NotNull] string name, [CanBeNull] object? defaultValue, [CanBeNull] string? description = null, bool isHiddenForClients = false) : base(name, defaultValue, description, isHiddenForClients)
        {
        }
        public static __ModuleName__Settings ModuleName { get; } = new(nameof(ModuleName), "__ModuleName__");

    }
}
