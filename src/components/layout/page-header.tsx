type PageHeader = {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
};

const PageHeader = ({ title, subTitle, children }: PageHeader) => {
  return (
    <div className="page-header">
      <div className="page-title-container">
        <h2 className="page-title">{title}</h2>
        {subTitle && <p className="page-sub-title">{subTitle}</p>}
      </div>
      {children && children}
    </div>
  );
};

export default PageHeader;
