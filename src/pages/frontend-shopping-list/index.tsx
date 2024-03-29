import { FormEvent, useState } from "react";
import ShoppingItemAddForm from "./components/ShoppingItemAddForm";
import ShoppingItemList from "./components/ShoppingItemList";
import { nanoid } from "nanoid";
import { ShoppingItemType } from "../../types/ShoppingItemType";
import { Helmet } from "react-helmet";
import { ShoppingListFormElement } from "./types";

export default function FrontendShoppingList({
  defaultData,
}: {
  defaultData?: ShoppingItemType[];
}) {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItemType[]>(
    defaultData || []
  );
  const [keywords, setKeywords] = useState<string>("");

  const handleItemRemove =
    <T1, T2>(id: T1) =>
    (_e: T2) => {
      setShoppingItems((items) => items.filter((item) => item.id !== id));
    };

  const handleItemCreate = (e: FormEvent<ShoppingListFormElement>) => {
    e.preventDefault();
    const { value: content } = e.currentTarget.elements.contentInput;
    setShoppingItems((curr: ShoppingItemType[]) => {
      return [
        ...curr,
        {
          id: nanoid(),
          content,
        },
      ];
    });

    setKeywords("");
    e.currentTarget.elements.contentInput.value = "";
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setKeywords(e.currentTarget.value);
  };

  return (
    <div className="container">
      <Helmet>
        <title>Frontend Shopping List</title>
      </Helmet>
      <h2 className="pt-3">Shopping List</h2>
      <div className="mw-500 mt-1">
        <ShoppingItemAddForm
          handleItemCreate={handleItemCreate}
          handleInputChange={handleInputChange}
        />
        <ShoppingItemList
          items={shoppingItems}
          handleItemRemove={handleItemRemove}
          keywords={keywords}
        />
      </div>
    </div>
  );
}
