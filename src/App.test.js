import MainApp from "./App";
import * as ReactDOM from "react-dom";

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MainApp/>, div)
  ReactDOM.unmountComponentAtNode(div)
});
