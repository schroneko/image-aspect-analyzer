import { UI_TEXT } from '../constants/messages';

function Loader() {
  return (
    <div className="loading">
      <div className="loader"></div>
      <p>{UI_TEXT.LOADING}</p>
    </div>
  );
}

export default Loader;