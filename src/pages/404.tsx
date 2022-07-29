const Custom404 = () => {
  return (
    <section
      className={
        'fixed inset-0 flex h-screen flex-auto flex-col items-center justify-center px-4 text-center dark:bg-neutral-900 sm:flex-row'
      }
    >
      <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-yellow-200 sm:mr-6 sm:border-r sm:border-neutral-900/50 sm:pr-6 sm:text-3xl sm:dark:border-yellow-300/50">
        404
      </h1>
      <h2 className="mt-2 text-lg text-neutral-700 dark:text-yellow-300 sm:mt-0">
        This page could not be found.
      </h2>
    </section>
  )
}

export default Custom404
