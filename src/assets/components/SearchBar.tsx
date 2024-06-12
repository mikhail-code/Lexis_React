import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Description, Field, Input } from "@headlessui/react";
import clsx from "clsx";

export default function Example() {
  return (
    <div className="flex flex-row items-center justify-center text-center">
      <div className="w-full px-1">
        <Field>
          <Input
            className={clsx(
              "border-b border-dark-blue block w-full bg-white/5 py-1.5 px-3 text-lg text-gold-darker-text",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
          <Description className="text-xs text-dark-blue">
            Write down phrase and press enter..
          </Description>
        </Field>
      </div>
      <MagnifyingGlassIcon
        className="h-5 w-5 text-dark-blue"
        aria-hidden="true"
      />
    </div>
  );
}
