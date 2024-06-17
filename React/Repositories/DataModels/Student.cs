using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.DataModels;

[Table("Expense")]
public partial class Expense
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public DateTime Date { get; set; }

    public double Price { get; set; }
}