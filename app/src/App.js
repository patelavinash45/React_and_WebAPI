import 'bootstrap/dist/css/bootstrap.css';
import Match from './Components/Match';
import { data } from './data';

function App() {

  return (
    <div className='container'>
      <div className='row'>
        {
          data.data.map(matchInfo => <Match key={matchInfo.id} matchInfo={matchInfo} />)
        }
      </div>
    </div>
  );
}

export default App;
