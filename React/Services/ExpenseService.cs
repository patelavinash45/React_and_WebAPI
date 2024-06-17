using Repositories;
using Repositories.DataModels;

namespace Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepo _expenseRepo;

        public ExpenseService(IExpenseRepo expenseRepo)
        {
            _expenseRepo = expenseRepo;
        }

        public Object GetAllExpenses(int year, int month, int pageNo)
        {
            List<ExpenseView> expenseViews = _expenseRepo.GetExpenses(year, month, (pageNo - 1) * 5)
                .Select(expense => new ExpenseView()
                {
                    Id = expense.Id,
                    Name = expense.Name,
                    Price = expense.Price,
                    Date = expense.Date,
                }).ToList();
            return new
            {
                TotalRecords = _expenseRepo.CountExpenses(year, month),
                Expenses = expenseViews,
            };
        }

        public ExpenseView GetExpenseById(int id)
        {
            Expense expense = _expenseRepo.GetExpenseById(id);
            return new ExpenseView()
            {
                Id = expense.Id,
                Name = expense.Name,
                Price = expense.Price,
                Date = expense.Date,
            };
        }

        public async Task<bool> AddExpense(AddExpenseView model)
        {
            return await _expenseRepo.AddExpense(
                new Expense
                {
                    Name = model.Name,
                    Price = model.Price,
                    Date = model.Date
                });
        }

        public async Task<bool> DeleteExpense(int id)
        {
            Expense expense = _expenseRepo.GetExpenseById(id);
            if (expense == null)
            {
                return false;
            }
            return await _expenseRepo.DeleteExpense(expense);
        }

        public async Task<bool> UpdateExpense(ExpenseView model)
        {
            return await _expenseRepo.UpdateExpense(
                new Expense()
                {
                    Id = model.Id,
                    Name = model.Name,
                    Price = model.Price,
                    Date = model.Date,
                });
        }
    }
}
