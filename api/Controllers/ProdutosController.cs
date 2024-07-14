using api.Context;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly DesafioContext _context;

        public ProdutosController(DesafioContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            var produto = _context.Produtos.FromSql($"SELECT * FROM \"Produtos\" p WHERE p.\"Id\" = {id}").FirstOrDefault();

            if (produto == null)
            {
                return NotFound();
            }

            return Ok(produto);
        }

        [HttpGet]
        public async Task<IActionResult> ObterTodos()
        {
            var produtos = await _context.Produtos.FromSql($"SELECT * FROM \"Produtos\" p WHERE p.\"Excluido\" = false ORDER BY p.\"Id\"").ToListAsync();

            foreach (var produto in produtos)
            {
                produto.Departamento = _context.Database.SqlQuery<Departamento>($"SELECT * FROM \"Departamentos\" d WHERE d.\"Id\" = {produto.DepartamentoId}").FirstOrDefault();
            }

            return Ok(produtos);
        }

        [HttpPost]
        public IActionResult Criar(Produto produto)
        {
            if (produto.Descricao == null || produto.Codigo == null || produto?.DepartamentoId == null || produto?.Preco == null || produto?.Status == null)
                return BadRequest(new { Message = "Os dados não podem ser nulos" });

            _context.Database.ExecuteSql($"INSERT INTO \"Produtos\" (\"Codigo\", \"Descricao\", \"DepartamentoId\", \"Preco\", \"Status\", \"Excluido\") VALUES ({produto.Codigo}, {produto.Descricao}, {produto.DepartamentoId}, {produto.Preco}, {produto.Status}, false)");

            return CreatedAtAction(nameof(ObterPorId), new { id = produto.Id }, produto);
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Produto produto)
        {
            var produtoBanco = _context.Produtos.FromSql($"SELECT * FROM \"Produtos\" p WHERE p.\"Id\" = {id}").FirstOrDefault();

            if (produtoBanco == null)
                return NotFound();

            if (produto.Descricao == null || produto.Codigo == null || produto?.DepartamentoId == null || produto?.Preco == null || produto?.Status == null)
                return BadRequest(new { Message = "Os dados não podem ser nulos" });

            _context.Database.ExecuteSql($"UPDATE \"Produtos\" SET \"Codigo\" = {produto.Codigo}, \"Descricao\" = {produto.Descricao}, \"DepartamentoId\" = {produto.DepartamentoId}, \"Preco\" = {produto.Preco}, \"Status\" = {produto.Status} WHERE \"Id\" = {id}");

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            var produto = _context.Produtos.FromSql($"SELECT * FROM \"Produtos\" p WHERE p.\"Id\" = {id}").FirstOrDefault();

            if (produto == null)
                return NotFound();

            _context.Database.ExecuteSql($"UPDATE \"Produtos\" SET \"Excluido\" = true WHERE \"Id\" = {id}");

            return NoContent();
        }
    }
}