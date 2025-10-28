import React from 'react';
import { createRoot } from 'react-dom/client';
import SearchEngine from './SearchEngine.jsx';
import './index.css';
/**
 * 入口文件
 */
const root = createRoot(document.getElementById('app'));
root.render(<SearchEngine />);
