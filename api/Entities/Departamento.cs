namespace api.Entities
{
    public class Departamento
    {
        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public bool Excluido { get; set; } = false;
    }
}