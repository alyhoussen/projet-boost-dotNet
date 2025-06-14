namespace Api.Models;

public class Tache
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string DueDate { get; set; } = "";
    public bool IsCompleted { get; set; }
}
