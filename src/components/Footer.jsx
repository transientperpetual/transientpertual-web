import Link from 'next/link'
import clsx from 'clsx'

import { BsTwitter, BsGithub } from 'react-icons/bs'
import { FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

import { Container } from '@/components/Container'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="font-poppins transition md:hover:text-indigo-500 md:dark:hover:text-indigo-400"
    >
      {children}
    </Link>
  )
}

function SocialLinkMobile({ className, icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon
        className={clsx(
          className,
          'h-5 w-5 fill-zinc-500 transition dark:fill-zinc-400'
        )}
      />
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 bg-gray-100 pt-10 pb-14 dark:border-zinc-700/40 dark:bg-black">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
              <div className="hidden gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200 md:flex">
                <NavLink href="https://x.com/perpesient">Twitter</NavLink>
                <NavLink href="https://github.com/transientperpetual">GitHub</NavLink>
                <NavLink href="https://www.linkedin.com/in/jangidankit/">
                  LinkedIn
                </NavLink>
                <NavLink href="/">Mail</NavLink>
              </div>
              <div className="flex gap-x-12 md:hidden">
                <SocialLinkMobile
                  href="https://x.com/perpesient"
                  aria-label="Follow on Twitter"
                  icon={BsTwitter}
                />
                <SocialLinkMobile
                  href="https://github.com/transientperpetual"
                  aria-label="Follow on GitHub"
                  icon={BsGithub}
                />
                <SocialLinkMobile
                  href="https://www.linkedin.com/in/jangidankit/"
                  aria-label="Follow on LinkedIn"
                  icon={FaLinkedinIn}
                />
                <SocialLinkMobile
                  className="h-6 w-6"
                  href="/"
                  aria-label="Send an email"
                  icon={MdEmail}
                />
              </div>
              <p className="font-poppins text-sm tracking-wider text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Ankit Jangid. All rights
                reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
