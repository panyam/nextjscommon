import React from 'react';
import { Header } from "./Header";
import { NavBar } from "./NavBar";

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
} as any;

const contentStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
} as any;

export const Layout = (props: any) => (
  <div className="Layout" style={layoutStyle}>
    <Header />
    <div className="Content" style={contentStyle}>
      {props.children}
    </div>
    <NavBar />
  </div>
);
