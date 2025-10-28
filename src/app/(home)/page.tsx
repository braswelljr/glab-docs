import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';
import { cn } from 'lib/utils';
import { Terminal, TypingAnimation } from '@/components/ui/terminal';

export default function Page() {
  return (
    <div className="flex h-full flex-1 flex-col p-5">
      <section className="bg-tictac -mx-5 -mt-10 bg-primary-50 px-5 dark:bg-stone-950">
        <div className="mx-auto max-w-3xl space-y-12 py-30">
          <h3 className="mx-auto text-center font-mono text-3xl font-bold tracking-wide md:text-5xl">Take GitLab to the command line</h3>
          <p className="mx-auto text-center text-xl font-medium md:text-2xl">
            GLab is an open source GitLab CLI tool bringing GitLab to your terminal next to where you are already working with git and your code.
          </p>

          <div className="mx-6 grid items-center justify-center">
            <Link
              href="/docs"
              className={cn(
                'inline-block rounded border-0 bg-secondary px-4 py-2 font-semibold text-stone-950 transition-all motion-reduce:hover:-translate-y-0.5'
              )}
            >
              Get Started
            </Link>
          </div>

          {/* <p className="space-y-4 text-center text-lg font-medium">
            <Link
              href="https://gitlab.com/gitlab-org/cli/#installation"
              className="link-underline inline-flex items-center space-x-2"
              target="_blank"
              rel="noreferrer"
            >
              <HiDownload className="h-4 w-auto" />
              <span>View installation instructions</span>
            </Link>
            <br />
            <a
              href="https://github.com/braswelljr/glab-docs"
              className="link-underline inline-flex items-center space-x-2"
              target="_blank"
              rel="noreferrer"
            >
              <HiPencilAlt className="h-4 w-auto" />
              <span>Contribute or Edit Docs</span>
            </a>
          </p>*/}
        </div>
      </section>

      <section className="">
        <div className="mx-auto max-w-3xl space-y-12 py-30">
          <Terminal
            startOnView
            className={cn(
              'min-h-72 w-full max-w-2xl bg-stone-50 shadow',
              '*:data-terminal-header:border-stone-300',
              '**:data-terminal-code:*:not-first:ml-4'
            )}
          >
            <TypingAnimation>$ glab alias</TypingAnimation>
            <TypingAnimation className="text-blue-500">Create, list, and delete aliases.</TypingAnimation>

            <TypingAnimation className="mt-4">USAGE</TypingAnimation>
            <TypingAnimation className="pl-5 text-secondary-300">glab alias [command] [flags]</TypingAnimation>

            <TypingAnimation className="mt-4">CORE COMMANDS</TypingAnimation>
            <TypingAnimation className="pl-5 text-secondary-300">delete: Delete an alias.</TypingAnimation>
            <TypingAnimation className="pl-5 text-secondary-300">list: List the available aliases.</TypingAnimation>
            <TypingAnimation className="pl-5 text-secondary-300">set: Set an alias for a longer command.</TypingAnimation>
          </Terminal>

          <div className="flex justify-center py-10">
            <Link
              href="/docs"
              className="flex items-center justify-center text-center text-xl font-semibold hocus:text-primary dark:hocus:text-secondary"
            >
              View all GitLab CLI Commands <HiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
