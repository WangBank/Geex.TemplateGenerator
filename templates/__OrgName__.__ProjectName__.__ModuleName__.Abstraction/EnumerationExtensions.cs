using System;
using System.Collections.Generic;
using System.Linq;

namespace __OrgName__.__ProjectName__.__ModuleName__.Abstraction
{
    public static class EnumerationExtensions
    {
        public static IEnumerable<TResult> Cast<TEnum, TResult>(this IEnumerable<TEnum> source) where TEnum : Enumeration<TEnum, TResult> where TResult : IEquatable<TResult>, IComparable<TResult>
        {
            if (source is IEnumerable<TResult> results)
                return results;
            if (source == null)
                throw new ArgumentNullException("source");
            return source.Select(x => (TResult)x);
        }


        public static Type GetClassEnumValueType(this Type type)
        {
            return type.GetBaseClasses(false).First(x => x.IsAssignableTo<IEnumeration>()).GenericTypeArguments[1];
        }

        public static IEnumerable<Type> GetClassEnumBases(this Type classEnumType)
        {
            return classEnumType.GetBaseClasses().Where(x => !x.IsGenericType && x.IsAssignableTo<IEnumeration>());
        }
        
        public static Type GetClassEnumRealType(this Type type)
        {
            return type.GetBaseClasses(false).First(x => x.IsAssignableTo<IEnumeration>()).GenericTypeArguments[0];
        }

    }
}