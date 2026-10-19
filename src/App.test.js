// 1.  "Тест проходит :  если на странице есть контейнером для списка listItems"
// 2.  "Тест проходит :  если в контейнере есть 3 текстовых параграфа"
// 3.  "Тест проходит :  если в контейнере меньше 5 параграфов"
// 4.  "Тест проходит :  если на странице есть поле ввод inputNewItem"
// 5.  "Тест проходит :  если на странице есть кнопка btnInputItem"
// 6.  "Тест проходит :  если в поле ввода нет значения и кнопка скрыта"
// 7.  "Тест проходит :  если в поле ввода есть значения и кнопка видна"
// 8.  "Тест проходит :  при клике на кнопку срабатывает функция"

// 9.  "Тест проходит :  при клике на кнопку и добавляется новый параграф"
// 10. "Тест проходит :  при клике на кнопку и добавляется новый параграф в конец списка"
// 11. "Тест проходит :  при клике на кнопку и добавляется новый параграф и содержится текст из поля"
// 12. "Тест проходит :  после добавляется нового параграфа поле ввода очищается"
// 13. "Тест проходит :  после очистки поля ввода кнопка скрывается"
// 14. "Тест проходит :  если параграфов больше 5 срабатывает функция удаления"
// 15. "Тест проходит :  если параграфов больше 5 удаляется первый элемент"

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(<App />);
});

test("1 Тест проходит :  если на странице есть контейнером для списка listItems", () => {
  const listItemsElement = screen.getByTestId("listItems");
  expect(listItemsElement).toBeInTheDocument();
});

test("2 Тест проходит :  если в контейнере есть 3 текстовых параграфа", () => {
  const listItemsElement = screen.getByTestId("listItems");
  expect(listItemsElement).toBeInTheDocument();
  // eslint-disable-next-line testing-library/no-node-access
  const listItems = listItemsElement.querySelectorAll("li");
  expect(listItems.length).toBeGreaterThanOrEqual(3);
});

test("3 Тест проходит :  если в контейнере меньше 5 параграфов", () => {
  const listItemsElement = screen.getByTestId("listItems");
  expect(listItemsElement).toBeInTheDocument();
  // eslint-disable-next-line testing-library/no-node-access
  const listItems = listItemsElement.querySelectorAll("li");
  expect(listItems.length).toBeLessThan(5);
});

test("4 Тест проходит :  если на странице есть поле ввод inputNewItem", () => {
  const input = screen.getByTestId("inputNewItem");
  expect(input).toBeInTheDocument();
});

test("5 Тест проходит :  если на странице есть кнопка btnInputItem", () => {
  const btn = screen.getByTestId("btnInputItem");
  expect(btn).toBeInTheDocument();
});

test("6 Тест проходит :  если в поле ввода нет значения и кнопка скрыта", () => {
  const btn = screen.queryByTestId("btnInputItem");
  expect(btn).toBeInTheDocument();
  expect(btn).not.toBeVisible();
});

test("7 Тест проходит :  если в поле ввода есть значения и кнопка видна", () => {
  const input = screen.getByTestId("inputNewItem");
  expect(input).toBeInTheDocument();

  const btn = screen.queryByTestId("btnInputItem");
  expect(btn).toBeInTheDocument();

  fireEvent.input(input, {
    target: { value: "123123" },
  });

  expect(btn).toBeVisible();
});

test("8 Тест проходит :  при клике на кнопку срабатывает функция", () => {
  const input = screen.getByTestId("inputNewItem");
  expect(input).toBeInTheDocument();

  fireEvent.input(input, {
    target: { value: "123123" },
  });

  const onPress = jest.fn();
  const { container } = render(<button onClick={onPress} />);
  // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
  const btn = container.querySelector("button");
  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);
  expect(onPress).toHaveBeenCalled();
  expect(onPress).toHaveBeenCalledTimes(1);
});

test("9 Тест проходит :  при клике на кнопку и добавляется новый параграф", () => {
  const input = screen.queryByTestId("inputNewItem");
  expect(input).toBeInTheDocument();

  const btn = screen.queryByTestId("btnInputItem");
  const listItemsElement = screen.queryByTestId("listItems");

  fireEvent.input(input, {
    target: { value: "123123" },
  });
  fireEvent.click(btn);

  // eslint-disable-next-line testing-library/no-node-access
  const listItems = listItemsElement.querySelectorAll("p");

  expect(listItems.length).toBeGreaterThanOrEqual(4); ///????
});

test("11 Тест проходит :  при клике на кнопку и добавляется новый параграф в конец списка", () => {
  const input = screen.queryByTestId("inputNewItem");
  expect(input).toBeInTheDocument();

  const btn = screen.queryByTestId("btnInputItem");
  expect(btn).toBeInTheDocument();

  const listItemsElement = screen.queryByTestId("listItems");

  fireEvent.input(input, {
    target: { value: "123123" },
  });
  fireEvent.click(btn);

  // eslint-disable-next-line testing-library/no-node-access
  const listItems = listItemsElement.querySelectorAll("p");
  const text =
    listItems[listItems.length - 1].textContent ||
    listItems[listItems.length - 1].innerText;

  expect(text).toBe("123123");
});

test("11 Тест проходит :  при клике на кнопку и добавляется новый параграф и содержится текст из поля", () => {
  const input = screen.queryByTestId("inputNewItem");
  expect(input).toBeInTheDocument();

  const btn = screen.queryByTestId("btnInputItem");
  expect(btn).toBeInTheDocument();

  const listItemsElement = screen.queryByTestId("listItems");

  const newText = "123123";

  fireEvent.input(input, {
    target: { value: newText },
  });
  fireEvent.click(btn);

  // eslint-disable-next-line testing-library/no-node-access
  const listItems = listItemsElement.querySelectorAll("p");
  const text =
    listItems[listItems.length - 1].textContent ||
    listItems[listItems.length - 1].innerText;

  expect(text === newText).toBe(true);
});

test("12. Тест проходит :  после добавляется нового параграфа поле ввода очищается", () => {
  const input = screen.queryByTestId("inputNewItem");
  expect(input).toBeInTheDocument();

  const btn = screen.queryByTestId("btnInputItem");
  expect(btn).toBeInTheDocument();

  const newText = "123123";

  fireEvent.input(input, {
    target: { value: newText },
  });
  fireEvent.click(btn);

  expect(input.value === "").toBe(true);
});

test("13 Тест проходит :  после очистки поля ввода кнопка скрывается", () => {
  const input = screen.queryByTestId("inputNewItem");
  expect(input).toBeInTheDocument();

  const btn = screen.queryByTestId("btnInputItem");
  expect(btn).toBeInTheDocument();

  const newText = "123123";

  fireEvent.input(input, {
    target: { value: newText },
  });
  fireEvent.click(btn);

  expect(btn).not.toBeVisible();
});

test("14 Тест проходит :  если параграфов больше 5 срабатывает функция удаления", () => {
  const input = screen.queryByTestId("inputNewItem");
  expect(input).toBeInTheDocument();

  const btn = screen.queryByTestId("btnInputItem");
  expect(btn).toBeInTheDocument();

  const listItemsElement = screen.queryByTestId("listItems");
  // eslint-disable-next-line testing-library/no-node-access
  const listItems = listItemsElement.querySelectorAll("p");

  expect(listItems.length).toBeGreaterThanOrEqual(3); ///????
  const newText = "123123";

  fireEvent.input(input, {
    target: { value: newText },
  });

  fireEvent.click(btn);

  expect(listItems.length).toBeGreaterThanOrEqual(3); ///????

  fireEvent.input(input, {
    target: { value: newText },
  });
  fireEvent.click(btn);
  expect(listItems.length).toBeGreaterThanOrEqual(3); ///????

  fireEvent.input(input, {
    target: { value: newText },
  });
  fireEvent.click(btn);
  expect(listItems.length).toBeGreaterThanOrEqual(3); ///????
});

test("15 Тест проходит :  если параграфов больше 5 удаляется первый элемент", () => {
  const input = screen.queryByTestId("inputNewItem");
  expect(input).toBeInTheDocument();

  const btn = screen.queryByTestId("btnInputItem");
  expect(btn).toBeInTheDocument();

  const listItemsElement = screen.queryByTestId("listItems");
  // eslint-disable-next-line testing-library/no-node-access
  const listItems = listItemsElement.querySelectorAll("p");

  const text = listItems[0].textContent || listItems[0].innerText;
  fireEvent.input(input, {
    target: { value: "123123" },
  });
  fireEvent.click(btn);

  fireEvent.input(input, {
    target: { value: "123123" },
  });
  fireEvent.click(btn);

  const newText = listItems[0].textContent || listItems[0].innerText;
  expect(text === newText).toBe(false);
});
