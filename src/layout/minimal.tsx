
// Useful when debugging or testing components without any layout.
const MinimalLayout = ({ children }: { children: React.ReactNode }) => {
  // This component does absolutely nothing but render its children.
  return <>{children}</>;
};

export default MinimalLayout;