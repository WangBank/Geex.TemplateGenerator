#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["__OrgName__.__ProjectName__.__ModuleName__/__OrgName__.__ProjectName__.__ModuleName__.csproj", "__OrgName__.__ProjectName__.__ModuleName__/"]
RUN dotnet restore "__OrgName__.__ProjectName__.__ModuleName__/__OrgName__.__ProjectName__.__ModuleName__.csproj"
COPY . .
WORKDIR "/src/__OrgName__.__ProjectName__.__ModuleName__"
RUN dotnet build "__OrgName__.__ProjectName__.__ModuleName__.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "__OrgName__.__ProjectName__.__ModuleName__.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "__OrgName__.__ProjectName__.__ModuleName__.dll"]