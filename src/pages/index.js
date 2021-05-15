import React from "react";
import { ticTacToe } from "../backgrounds/background";

const Index = () => {
  return (
    <>
      <section
        style={{ backgroundImage: ticTacToe }}
        className="px-8 py-12 space-y-12 md:px-20 xl:px-40 lg:px-32"
      >
        <h3 className="mx-auto font-black tracking-wide text-center text-7xl md:w-3/5">
          Take GitLab to the command line
        </h3>
        <p className="mx-auto text-2xl font-medium text-center md:w-3/5">
          GLab is an open source GitLab CLI tool bringing GitLab to your terminal next to where you
          are already working with git and your code.
        </p>
        <button
          type="button"
          className="block py-3 mx-auto text-xl font-semibold text-white bg-black border border-current rounded px-7"
        >
          Get Started
        </button>
        <p className="text-lg font-medium text-center">
          <a href="https://github.com/profclems/glab#installation" className="hover:underline">
            View installation instructions →
          </a>
        </p>
      </section>
      <section className="px-8 py-12 space-y-12 md:px-20 xl:px-40 lg:px-32">
        <p className="mx-auto text-2xl font-medium text-center md:w-3/5">
          <p>Good bye context switching.</p>
          <p>Hello, Terminal</p>
        </p>
      </section>
    </>
  );
};

export default Index;
