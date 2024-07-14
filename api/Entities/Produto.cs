namespace api.Entities
{
  public class Produto
  {
    public int Id { get; set; }
    public string Codigo { get; set; }
    public string Descricao { get; set; }
    public int DepartamentoId { get; set; }
    public virtual Departamento Departamento { get; set; }
    public decimal Preco { get; set; }
    public bool Status { get; set; }
    public bool Excluido { get; set; } = false;
  }
}