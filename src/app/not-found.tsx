export default function Custom404() {
  return (
    <section className="grid h-screen place-content-center px-4 text-center">
      <div className="">
        <div className="flex flex-auto flex-col items-center justify-center sm:flex-row">
          <h1 className="text-7xl font-extrabold tracking-tight text-neutral-900 sm:mr-6 sm:border-r sm:border-neutral-900/50 sm:pr-6 dark:text-white/40 sm:dark:border-white/50">
            404
          </h1>
          <h2 className="mt-2 text-lg text-neutral-700 sm:mt-0 dark:text-white">This page could not be found.</h2>
        </div>
      </div>
    </section>
  );
}
