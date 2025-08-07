import App from './App';
import {IS_DEV} from "../chrome/const/support";
if(IS_DEV)console.log('INIT UI APP');

export const initUI = async (Executor, href, name) => {
  const React = await import('react');
  const ReactDOM = await import('react-dom/client');

  const {DEFAULT_SCOPE, ScopeCtx} = await import("./scope");
  // const App = await import('./App');

  await import('rsuite/dist/rsuite.min.css')
  await import('./output.css');
  await new Promise((r) => {
    setTimeout(r, 600)
  })

  const root = ReactDOM.createRoot(
    document.getElementById('root')
  );

  root.render(
    <ScopeCtx.Provider value={DEFAULT_SCOPE}>
        <App Executor={Executor} href={href} name={name}/>
    </ScopeCtx.Provider>
  );
}

const styles = document.createElement('style');
styles.innerHTML = `
iframe#react-refresh-overlay {
    display: none;
}`;
document.head.appendChild(styles);
