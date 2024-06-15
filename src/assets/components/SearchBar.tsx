import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTranslation } from '../actions/translate';
import { RootState, AppDispatch } from '../slices/store'; // import AppDispatch
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Description, Field, Input } from "@headlessui/react";
import clsx from "clsx";

export default function SearchBar() {
  const [text, setText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const translatedText = useSelector((state: RootState) => state.translation.translatedText);
  const dispatch = useDispatch<AppDispatch>();

  const handleTranslate = () => {
    dispatch(fetchTranslation({ text, sourceLanguage: 'en', targetLanguage: 'fr' })).then(() => setShowResults(true));
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-full min-w-80 px-1">
        <Field>
          <div className="flex flex-grid items-center justify-center text-center">
          <Input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setShowResults(false);
            }}
            className={clsx(
              "border-b border-dark-blue block w-full bg-white/5  text-lg text-gold-darker-text",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleTranslate();
              }
            }}
          />
          <MagnifyingGlassIcon
        className="h-5 w-5 text-dark-blue"
        aria-hidden="true"
        onClick={handleTranslate}
      />
          </div>
          
          <Description className="text-xs text-dark-blue">
            Write down phrase and press enter..
          </Description>
        </Field>
      </div>
      {showResults && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <strong>Phrase:</strong> {text}
          </div>
          <div>
            <strong>Translation:</strong> {translatedText}
          </div>
          <div>
            <p className="text-sm">Add to dictionary (+)</p>
          </div>
        </div>
      )}
    </div>
  );
}
