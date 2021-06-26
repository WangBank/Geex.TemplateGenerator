#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["MyOrg.MyProject.MyModule/MyOrg.MyProject.MyModule.csproj", "MyOrg.MyProject.MyModule/"]
RUN dotnet restore "MyOrg.MyProject.MyModule/MyOrg.MyProject.MyModule.csproj"
COPY . .
WORKDIR "/src/MyOrg.MyProject.MyModule"
RUN dotnet build "MyOrg.MyProject.MyModule.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyOrg.MyProject.MyModule.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyOrg.MyProject.MyModule.dll"]
