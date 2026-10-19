import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [listItems, setListItems] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const L = ["Item 11", "Item 21", "Item 31"];
    setListItems(L);
  }, []);

  const addItems = (text) => {
    const L = [...listItems];
    L.push(text);

    if (L.length > 4) {
      L.shift();
    }
    setListItems(L);
  };

  const onChangeText = (text) => {
    setValue(text);
  };

  const btnClick = () => {
    addItems(value);
    setValue("");
  };

  return (
    <div className="App" data-testid="App">
      <h1>Task for 4</h1>
      <div className="task">
        <ol>
          <li>Описать тестовые сценарии для задачи про параграфы.</li>
          <li>Написать скрипт для реализации следующего приложения:</li>
          <ol>
            <li>
              На странице должны быть три текстовых параграфа, поле ввода и
              кнопка.{" "}
            </li>
            <li>Напишите скрипт, который будет выполнять следующие условия:</li>
          </ol>
        </ol>
      </div>
      <ol>
        <li>Кнопка скрыта, если в поле ввода нет значения.</li>
        <li>
          При клике на кнопку добавляется новый параграф, содержащий текст из
          поля ввода.
        </li>
        <li>Если параграфов становится больше 4, первый из них удаляется.</li>
        <li>
          Оформить задачи в виде списка. Отправить список в чат с
          преподавателем.
        </li>
      </ol>
      <div className="testArea">
        <h2>Тестовая программа</h2>
        <div className="workingArea">
          <ol className="listItems" data-testid="listItems">
            {listItems.map((item, index) => {
              return (
                <li key={index}>
                  <p>{item}</p>
                </li>
              );
            })}
          </ol>

          <div className="footer">
            <input
              value={value}
              type="text"
              className="inputNewItem"
              data-testid="inputNewItem"
              onChange={(e) => onChangeText(e.target.value)}
            />

            <button
              hidden={value === ""}
              className="btnInputItem"
              data-testid="btnInputItem"
              onClick={btnClick}
            >
              Сохранить значение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
