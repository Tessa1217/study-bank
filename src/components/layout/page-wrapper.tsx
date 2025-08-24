const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page">
      <div className="page-content">{children}</div>
    </div>
  );
};

export default PageWrapper;
