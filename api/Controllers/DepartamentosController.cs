using api.Context;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartamentosController : ControllerBase
    {
        private readonly DesafioContext _context;
        public DepartamentosController(DesafioContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            var departamento = _context.Database.SqlQuery<Departamento>($"SELECT * FROM \"Departamentos\" d WHERE d.\"Id\" = {id}").FirstOrDefault();

            if (departamento == null){
                return NotFound();
            }

            return Ok(departamento);
        }

        [HttpGet]
        public IActionResult ObterTodos()
        {
            var departamentos = _context.Database.SqlQuery<Departamento>($"SELECT * FROM \"Departamentos\" d WHERE d.\"Excluido\" = false ORDER BY d.\"Id\"");
            return Ok(departamentos);
        }

        [HttpPost]
        public IActionResult Criar(Departamento departamento)
        {
            if (departamento.Descricao == null || departamento.Codigo == null)
                return BadRequest(new { Message = "Os dados não podem ser nulos" });

            _context.Database.ExecuteSql($"INSERT INTO \"Departamentos\" (\"Codigo\", \"Descricao\", \"Excluido\") VALUES ({departamento.Codigo}, {departamento.Descricao}, false)");

            return CreatedAtAction(nameof(ObterPorId), new { id = departamento.Id }, departamento);
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Departamento departamento)
        {
            var departamentoBanco = _context.Database.SqlQuery<Departamento>($"SELECT * FROM \"Departamentos\" d WHERE d.\"Id\" = {id}").FirstOrDefault();

            if (departamentoBanco == null)
                return NotFound();

            if (departamento.Descricao == null || departamento.Codigo == null)
                return BadRequest(new { Message = "Os dados não podem ser nulos" });
    
            _context.Database.ExecuteSql($"UPDATE \"Departamentos\" SET \"Codigo\" = {departamento.Codigo}, \"Descricao\" = {departamento.Descricao} WHERE \"Id\" = {id}");

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            var departamento = _context.Database.SqlQuery<Departamento>($"SELECT * FROM \"Departamentos\" d WHERE d.\"Id\" = {id}").FirstOrDefault();

            if (departamento == null)
                return NotFound();

            var produtoInDepart = _context.Produtos.FromSql($"SELECT * FROM \"Produtos\" p WHERE p.\"DepartamentoId\" = {id}");

            if(produtoInDepart.Any())
                return BadRequest(new { Message = "O departamento está relacionado a um produto e não pode ser excluído!" });

            _context.Database.ExecuteSql($"UPDATE \"Departamentos\" SET \"Excluido\" = true WHERE \"Id\" = {id}");
            
            return NoContent();
        }
    }
}