import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, MagnifyingGlassIcon  } from '@heroicons/react/20/solid'
import axios from "axios";

import { ComboboxInput } from '@headlessui/react'
import { ComboboxButton } from '@headlessui/react'
import { ComboboxOptions } from '@headlessui/react'
import { ComboboxOption } from '@headlessui/react'


const people = [
  { id: 1, name: 'Hello' },
  { id: 2, name: 'Bye' },
  { id: 3, name: 'When' },
  { id: 4, name: 'How' },
  { id: 5, name: 'People' },
  { id: 6, name: 'Food' },
]

export default function Example() {
  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="flex justify-center w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 w-full">
        <div class="relative w-full cursor-default overflow-hidden text-left border-b border-dark-blue focus:outline-none sm:text-sm">
            <ComboboxInput
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </ComboboxButton>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <ComboboxOption
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
