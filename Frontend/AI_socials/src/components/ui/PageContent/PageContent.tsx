import "./PageContent.css";

import type { PageContentProps } from "./PageContent.types";

const PageContent = ({ children, className = "" }: PageContentProps) => {
  return <main className={`page-content ${className}`}>{children}</main>;
};

export default PageContent;
