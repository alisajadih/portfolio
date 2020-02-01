import React from "react";
import Header from "../shared/Header";

const BaseLayout = ({
  className,
  children,
  isAuthenticated,
  user
}) => {
  return (
    <div className="layout-container">
      <Header auth={{ isAuthenticated, user }} />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;
