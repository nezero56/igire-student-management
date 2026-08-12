interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  );
}
