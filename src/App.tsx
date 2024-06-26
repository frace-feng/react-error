import { useState } from "react";
import React from "react";
import "./App.css";
import CatchReactError from "./handleError";

const FnCount1 = ({ count }: { count: number }) => {
  if (count == 3) throw new Error("函数组件：count is 3会报错");
  return <span>{count}</span>;
};
class FnCount2 extends React.Component {
  render() {
    const { count } = this.props;
    if (count == 2) throw new Error("类组件：count is 2会报错");
    return <span>{count}</span>;
  }
}
const errorbackfn = ({ error: { message }, resetErrorBoundary }) => (
  <div>
    <p>出错信息：{message}</p>
    <button onClick={resetErrorBoundary}>再试一次</button>
  </div>
);
const errorbackcom = () => <h4>出错啦,不可撤销</h4>;

function App() {
  const [count, setCount] = useState(0);

  const ListenError = (arg, info) => console.log("出错了:" + arg.message, info); //错误时进行的回调
  const onReset = () => setCount(0); //点击重置时进行的回调

  return (
    <>
      <div className="App">
        <section>
          <button onClick={() => setCount((count) => count + 1)}>+</button>
          <button onClick={() => setCount((count) => count - 1)}>-</button>
        </section>
        <hr />
        <div>
          类组件UI:
          <CatchReactError InnerComponent={FnCount2}  count={count}
            fallbackRender={errorbackfn}
            onReset={onReset}
            onError={ListenError}></CatchReactError>
        </div>
        <div style={{ borderTop: "1px solid #eee", margin: "20px 0" }}></div>
        <div>
          函数组件UI:
          <CatchReactError InnerComponent={FnCount1}  count={count}
            FallbackComponent={errorbackcom}
            onReset={onReset}
            onError={ListenError}></CatchReactError>
        </div>
      </div>
    </>
  );
}

export default App;
