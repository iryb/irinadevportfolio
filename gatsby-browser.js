/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
 import './src/styles/global.css';
 import React from 'react';

 import PageLayout from './src/layouts/page-layout';
 
 export const wrapPageElement = ({ element }) => {
   return <PageLayout>{element}</PageLayout>;
 };