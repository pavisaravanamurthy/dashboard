"use client";
import { Provider } from "react-redux";
import { App } from "antd";
import { store } from "./store/store";

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <App message={{ maxCount: 3, top: 20 }}>{children}</App>
    </Provider>
  );
}
