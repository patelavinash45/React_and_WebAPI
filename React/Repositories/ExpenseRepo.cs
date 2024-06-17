using Repositories.DataModels;
using Repositories.DbContect;

namespace Repositories
{
    public class ExpenseRepo : IExpenseRepo
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ExpenseRepo(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public int CountExpenses(int year, int month)
        {
            return _applicationDbContext.Expenses.Count(a => (year == 0 || year == a.Date.Year) && (month == 0 || month == a.Date.Month));
        }

        public List<Expense> GetExpenses(int year, int month, int skip)
        {
            return _applicationDbContext.Expenses.Where(a => (year == 0 || year == a.Date.Year) && (month == 0 || month == a.Date.Month)).OrderByDescending(a => a.Id).Skip(skip).Take(5).ToList();
        }

        public Expense GetExpenseById(int expenseId)
        {
            return _applicationDbContext.Expenses.FirstOrDefault(a => a.Id == expenseId);
        }

        public async Task<bool> AddExpense(Expense expense)
        {
            _applicationDbContext.Expenses.Add(expense);
            return await _applicationDbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteExpense(Expense expense)
        {
            _applicationDbContext.Expenses.Remove(expense);
            return await _applicationDbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateExpense(Expense expense)
        {
            _applicationDbContext.Expenses.Update(expense);
            return await _applicationDbContext.SaveChangesAsync() > 0;
        }
    }
}
