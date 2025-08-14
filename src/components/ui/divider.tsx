const Divider = ({ dividerText }: { dividerText: string }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        {dividerText && (
          <span className="bg-white px-2 text-gray-500">{dividerText}</span>
        )}
      </div>
    </div>
  );
};

export default Divider;
