export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#121212] select-none pointer-events-auto">
      {/* Simple text + loadbar */}
      <div className="w-[180px] flex flex-col items-center gap-2.5">
        <div className="flex items-center justify-between w-full text-xs font-mono text-stone-600 dark:text-stone-400">
          <span>Loading</span>
          <span className="inline-block animate-pulse">...</span>
        </div>

        {/* Loadbar container */}
        <div className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 bg-stone-900 dark:bg-stone-100 rounded-full animate-progress-indeterminate w-1/3" />
        </div>
      </div>
    </div>
  );
}

