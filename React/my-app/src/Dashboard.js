import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseItem from "./Components/ExpenseItem";
import NewExpense from "./Components/NewExpense";
import Card from "./Components/UI/Card";
import ExpenseFilter from "./Components/ExpenseFilter";
import ExpenseChart from "./Components/ExpenseChart";
import LoadingSkeleton from './Components/UI/LoadingSkeleton';
import { getAllExpenses } from './Components/APIRequest/api';
import ShowNoOfPage from './Components/UI/Pagination';
let expenses = [];
let totalRecords = 0;
let delayTime = 1000;

function Dashboard() {
  const state = useSelector(state => state);
  const year = state.filter.Year;
  const month = state.filter.Month;
  const pageNo = state.pageNo;
  const isDataExits = state.dataLoad;

  const dataLoadDispatch = useDispatch();
  if (!isDataExits) {
    const interval = setInterval(() => {
      getAllExpenses(pageNo, year, month).then((data) => {
        expenses = data.expenses;
        totalRecords = data.totalRecords;
        dataLoadDispatch({ type: 'reload', value: true });
        delayTime = 100;
      });
      clearInterval(interval);
    }, delayTime);
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
    }, delayTime);
  }

  let expenseDiv = <p className="text-danger text-center">No Expense Found</p>;
  if (expenses.length > 0) {
    expenseDiv = expenses.map(expense => {
      return <ExpenseItem key={expense.id} expense={expense} />;
    });
    expenseDiv = (
      <span>
        {expenseDiv}
        <ShowNoOfPage totalRecords={totalRecords} />
      </span>
    );
  };

  return (
    <div className="body">
      <div className="container">
        <NewExpense />
        <Card className="dataDiv p-3 mb-2">
          {
            isDataExits
              ? <span>
                <ExpenseFilter selectedYear={year} selectedMonth={month} />
                {
                  month == 0 && <ExpenseChart expenses={expenses} />
                }
                {expenseDiv}
              </span>
              : <LoadingSkeleton />
          }
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
