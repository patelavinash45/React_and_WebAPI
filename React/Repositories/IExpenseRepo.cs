using Repositories.DataModels;

namespace Repositories
{
    public interface IExpenseRepo
    {
        int CountExpenses(int year, int month);

        List<Expense> GetExpenses(int year, int month, int skip);

        Expense GetExpenseById(int expenseId);

        Task<bool> AddExpense(Expense expense);

        Task<bool> DeleteExpense(Expense expense);

        Task<bool> UpdateExpense(Expense expense);
    }
}