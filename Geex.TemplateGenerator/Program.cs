using System;
using System.IO;
using System.Threading.Tasks;

namespace Geex.TemplateGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("enter org name.");
            var orgName = Console.ReadLine().Trim();
            Console.WriteLine("enter project name.");
            var projectName = Console.ReadLine().Trim();
            Console.WriteLine("enter module name.");
            var moduleName = Console.ReadLine().Trim();
            Console.WriteLine("enter default aggregate name.");
            var aggregateName = Console.ReadLine().Trim();
            Console.WriteLine("enter template path, press enter if it's current directory");
            var cwd = Console.ReadLine() ?? Directory.GetCurrentDirectory();
            var target = Path.Combine(cwd, "generated");
            var renameEntries = Directory.GetFileSystemEntries(cwd, "*", SearchOption.AllDirectories);
            Parallel.ForEach(renameEntries, renameEntry =>
            {
                var destEntry = renameEntry.Replace(cwd, target)
                    .Replace("__OrgName__", orgName)
                    .Replace("__ProjectName__", projectName)
                    .Replace("__ModuleName__", moduleName)
                    .Replace("__AggregateName__", aggregateName);
                if (File.Exists(renameEntry))
                {
                    var srcFile = new FileInfo(renameEntry);
                    var destFile = new FileInfo(destEntry);
                    if (!destFile.Directory.Exists)
                    {
                        destFile.Directory.Create();
                    }
                    using var sr = srcFile.OpenText();
                    using var sw = destFile.CreateText();
                    string line;
                    while ((line = sr.ReadLine()) != null)
                    {
                        sw.WriteLine(line
                            .Replace("__OrgName__", orgName)
                            .Replace("__ProjectName__", projectName)
                            .Replace("__ModuleName__", moduleName)
                            .Replace("__AggregateName__", aggregateName));
                    }
                }
                else
                {
                    Directory.CreateDirectory(destEntry);
                }
            });
        }
    }
}
