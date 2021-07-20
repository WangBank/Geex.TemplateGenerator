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
            var input = Console.ReadLine();
            var cwd = string.IsNullOrEmpty(input) ? Directory.GetCurrentDirectory() : input;
            Console.WriteLine("enter template path, press enter if it's current directory");
            input = Console.ReadLine();
            var target = Path.Combine(string.IsNullOrEmpty(input) ? cwd : input, "generated");
            var templatePath = cwd + "/templates";
            var renameEntries = Directory.GetFileSystemEntries(templatePath, "*", SearchOption.AllDirectories);
            Parallel.ForEach(renameEntries, renameEntry =>
            {
                var destEntry = renameEntry.Replace(templatePath, target)
                    .Replace("_org_", orgName)
                    .Replace("_proj_", projectName)
                    .Replace("_mod_", moduleName)
                    .Replace("_aggregate_", aggregateName);
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
                            .Replace("_org_", orgName)
                            .Replace("_proj_", projectName)
                            .Replace("_mod_", moduleName)
                            .Replace("_aggregate_", aggregateName));
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
