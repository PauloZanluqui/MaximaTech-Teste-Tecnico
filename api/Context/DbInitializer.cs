using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Context
{
    public class DbInitializer
    {
        public static void Initialize(DesafioContext context)
        {
            var hasDepartamentos = context.Database.SqlQuery<Departamento>($"SELECT * FROM \"Departamentos\"").Any();

            if (hasDepartamentos)
            {
                return;
            }

            var sqlInsert = @"
				INSERT INTO ""Departamentos"" (""Codigo"", ""Descricao"", ""Excluido"") values ('010', 'BEBIDAS', false);
				INSERT INTO ""Departamentos"" (""Codigo"", ""Descricao"", ""Excluido"") values ('020', 'CONGELADOS', false);
				INSERT INTO ""Departamentos"" (""Codigo"", ""Descricao"", ""Excluido"") values ('030', 'LATICINIOS', false);
				INSERT INTO ""Departamentos"" (""Codigo"", ""Descricao"", ""Excluido"") values ('040', 'VEGETAIS', false);
			";

            context.Database.ExecuteSqlRaw(sqlInsert);
        }
    }
}