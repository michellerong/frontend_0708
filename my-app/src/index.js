import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 在根元素創建根
const root = ReactDOM.createRoot(document.getElementById('root'));

// 渲染應用程序
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
