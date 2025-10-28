export default function Custom404() {
  return (
    <section className="grid h-screen place-content-center px-4 text-center">
      <div className="">
        <div className="flex flex-auto flex-col items-center justify-center sm:flex-row">
          <h1 className="text-7xl font-extrabold tracking-tight text-primary sm:mr-6 sm:border-r sm:border-secondary sm:pr-6">404</h1>
          <h2 className="mt-2 text-lg text-primary sm:mt-0">This page could not be found.</h2>
        </div>
      </div>
    </section>
  );
}
