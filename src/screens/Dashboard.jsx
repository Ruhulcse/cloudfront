import React, { useState } from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

function Dashboard() {
  let data = JSON.parse(localStorage.getItem('user'));
  let userType = data.role;
  let userName = data.name;
  console.log(userType);

  const logoutHandler = () => {
    console.log('clicked');
    localStorage.clear();
    window.location.href = '/';
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: true, admin: false },
    {
      name: 'Add Data',
      href: '/dashboard/addData',
      current: false,
      admin: false,
    },
    { name: 'Show Data', href: '/showData', current: false, admin: false },
    {
      name: 'Add User',
      href: '/dashboard/adduser',
      current: false,
      admin: true,
    },
    { name: 'Show User', href: '/showuser', current: false, admin: true },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <h4>
                      <a
                        className="text-white hover:no-underline"
                        href="/dashboard"
                      >
                        Data Workspace
                      </a>
                    </h4>
                    {/* <img
                      className="block lg:hidden h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    /> */}
                    {/* <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                      alt="Workflow"
                    /> */}
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white hover:no-underline'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:no-underline',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {userType === 'admin' && item.name}
                          {userType !== 'admin' && !item.admin && item.name}
                          {/* {userType === 'admin' && item.name}
                          {userType !== 'admin' && !item.admin && item.name} */}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/dashboard/userprofile"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 hover:no-underline'
                                  )}
                                >
                                  Profile
                                </a>
                              )}
                            </Menu.Item>
                            {/* <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item> */}
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 hover:no-underline'
                                  )}
                                  onClick={logoutHandler}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* <div className="container-fluid">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Data Workspace
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#!">
                  Add Data<span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!#">
                  Show Data
                </a>
              </li>
              {userType === 'admin' && (
                <li className="nav-item">
                  <a className="nav-link" href="!#">
                    Add User
                  </a>
                </li>
              )}
              {userType === 'admin' && (
                <li className="nav-item">
                  <a className="nav-link" href="!#">
                    Show User
                  </a>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="!#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {userName}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="!#">
                    Profile
                  </a>
                  <button className="dropdown-item" onClick={logoutHandler}>
                    Log out
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div> */}
    </>
  );
}

export default Dashboard;
