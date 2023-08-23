import React, { useState } from "react"
import classNames from "classnames"
import { signOut, useSession } from "next-auth/react"
import { Icon } from '@iconify/react';

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false)
  const { data: session, status } = useSession()
  return (
    <nav className="bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          {/* 메뉴 */}
          <div className="flex space-x-4">
            <div>
              <a href="/" className="flex items-center py-5 px-2 text-gray-700">
                <img
                  className="h-5 mr-2"
                  src="/AU2.png"
                />
                {/* <svg
                  xmlns="/BallandLogo.png"
                  className="h-5 w-5 mr-2 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                    clipRule="evenodd"
                  />
                </svg> */}
                <span className="font-bold">Balland</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a
                href="/reservation"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                운동장 예약
              </a>
              <a
                href="/competition"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                대회 정보
              </a>
              <a
                href="/club"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                동아리 정보
              </a>
              <a
                href="/checkreservation"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                예약정보 확인
              </a>
              <a
                href="/information"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                공지사항
              </a>
            </div>
          </div>

          {/* 메뉴2 */}
          {status === "authenticated" ? (
            <div className="hidden md:flex items-center">
              <Icon icon="ic:round-account-circle" className="w-6 h-6" />
              <span className="mr-4">{session.user.email}</span>
              <button className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded" onClick={() => signOut()}>
                Log out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center">
              <Icon icon="ic:round-account-circle" className="w-6 h-6" />
              <span className="mr-4">로그인해주세요.</span>
              <a href="/auth/signin" className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded">
                Login
              </a>
              {/* <a
                href="/auth/signup"
                className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
              >
                Signup
              </a> */}
            </div>
          )}
          {/* mobile menu */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuToggle(!menuToggle)}>
              {menuToggle ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu items */}
      <div className={classNames("md:hidden", { hidden: !menuToggle })}>
        <a
          href="/reservation"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          운동장 예약
        </a>
        <a
          href="/competition"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          대회 정보
        </a>
        <a href="/club" className="block py-2 px-4 text-sm hover:bg-gray-200">
          동아리 정보
        </a>
        <a href="/checkreservation" className="block py-2 px-4 text-sm hover:bg-gray-200">
          예약정보 확인
        </a>
        <a href="/information" className="block py-2 px-4 text-sm hover:bg-gray-200">
          공지사항
        </a>
        {status === "authenticated" ? (
          <button
            className="block py-2 px-4 text-sm hover:bg-gray-200"
            onClick={() => signOut()}
          >
            로그아웃
          </button>
        ) : (
          <>
            <a
              href="/auth/signin"
              className="block py-2 px-4 text-sm hover:bg-gray-200"
            >
              로그인
            </a>
            <a
              href="/auth/signup"
              className="block py-2 px-4 text-sm hover:bg-gray-200"
            >
              회원가입
            </a>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
