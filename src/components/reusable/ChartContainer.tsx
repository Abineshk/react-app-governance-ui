interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  actions,
}) => {
  return (
    <div className="bg-white border border-purple-200 rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-medium text-gray-800">{title}</h3>
        {/* Toggle buttons */}
        <div>{actions}</div>
      </div>
      <div className="w-full h-full mt-5 hover:bg-white/40 transition-all duration-300 relative">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;
