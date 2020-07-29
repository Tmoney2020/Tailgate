﻿using System;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure;


namespace Tailgate.Models
{
    public partial class DatabaseContext : DbContext
    {
        private static string DEVELOPMENT_DATABASE_NAME = "TailgateDatabase";

        private static bool LOG_SQL_STATEMENTS_IN_DEVELOPMENT = false;

        public DbSet<Party> Parties { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<User> Users { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (LOG_SQL_STATEMENTS_IN_DEVELOPMENT && Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
                optionsBuilder.UseLoggerFactory(loggerFactory);
            }

            if (!optionsBuilder.IsConfigured)
            {
                var databaseURL = Environment.GetEnvironmentVariable("DATABASE_URL");
                var defaultConnectionString = $"server=localhost;database={DEVELOPMENT_DATABASE_NAME}";

                var conn = databaseURL != null ? ConvertPostConnectionToConnectionString(databaseURL) : defaultConnectionString;

                optionsBuilder.UseNpgsql(conn, postgresOptions => postgresOptions.UseNetTopologySuite());
            }
        }

        private string ConvertPostConnectionToConnectionString(string connection)
        {
            var _connection = connection.Replace("postgres://", String.Empty);

            var connectionParts = Regex.Split(_connection, ":|@|/");

            return $"server={connectionParts[2]};database={connectionParts[4]};User Id={connectionParts[0]};password={connectionParts[1]};port={connectionParts[3]}";
        }
    }
}
