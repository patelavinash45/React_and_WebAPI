using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Repositories.DataModels;

namespace Repositories.DbContect;
public partial class ApplicationDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public ApplicationDbContext() { }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions, IConfiguration configuration) : base(dbContextOptions)
    {
        _configuration = configuration;
    }

    public virtual DbSet<Expense> Expenses { get; set; }

    public virtual DbSet<User> Users { get; set; }

}
