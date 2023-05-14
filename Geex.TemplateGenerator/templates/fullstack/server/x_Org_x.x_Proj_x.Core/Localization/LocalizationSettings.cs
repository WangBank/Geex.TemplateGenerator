﻿using System.Text.Json.Nodes;
using Geex.Common.Settings.Abstraction;
using JetBrains.Annotations;

namespace x_Org_x.x_Proj_x.Core.Localization
{
    public class LocalizationSettings : SettingDefinition
    {
        public LocalizationSettings([NotNull] string name, SettingScopeEnumeration[] validScopes,
            [CanBeNull] string? description = null, bool isHiddenForClients = false, JsonNode? defaultValue = null) : base(nameof(Geex.Core.Localization) + name, validScopes, description, isHiddenForClients, defaultValue)
        {
        }
        public static LocalizationSettings Language { get; } = new(nameof(Language), new[] { SettingScopeEnumeration.Global, SettingScopeEnumeration.User }, defaultValue: JsonValue.Create("zh-cn"));
        public static LocalizationSettings Data { get; } = new(nameof(Data), new[] { SettingScopeEnumeration.Global }, defaultValue: JsonNode.Parse(
            """
            {
                "zh-cn":{},
                "en-us":{}
            }
            """
            ));
    }
}
