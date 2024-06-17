using Repositories.DataModels;

namespace Services
{
    public interface IExpenseService
    {
        Object GetAllExpenses(int year, int month, int pageNo);

        ExpenseView GetExpenseById(int id);

        Task<bool> AddExpense(AddExpenseView model);

        Task<bool> DeleteExpense(int id);

        Task<bool> UpdateExpense(ExpenseView model);
    }
}