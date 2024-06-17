using System.ComponentModel.DataAnnotations;

public class ExpenseView
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    [RegularExpression("(.*[1-9].*)|(.*[.].*[1-9].*)")]
    public double Price { get; set; }
}

public class AddExpenseView
{
    [Required]
    public string Name { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [RegularExpression("(.*[1-9].*)|(.*[.].*[1-9].*)")]
    public double Price { get; set; }
}

public class UserView
{
    [Required]
    //[EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}

