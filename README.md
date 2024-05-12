# MultiSelectAutoCompleteInput Component

## Overview

This component provides a versatile autocomplete input field with support for multiple selections. It's particularly useful when you need users to select multiple options from a large dataset efficiently.

## Installation

You can clone this github repo via git:

```bash
git clone https://github.com/devcusn/multi-select-autocomplete-component.git
```
## Usage

To use the MultiSelectAutoCompleteInput component, simply import it into your project and integrate it as shown below:

```js
import React, { useState } from 'react';
import MultiSelectAutoCompleteInput from 'multisiselect-autocomplete-component';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterParam, setFilterParam] = useState('');
  const [characters, setCharacters] = useState([]);

  // Load characters data asynchronously, e.g., useEffect

  return (
    <MultiSelectAutoCompleteInput
      isLoading={isLoading}
      // if you want the input value, you can use this prop. But it can already do its own filtering process.
      onChangeInput={setFilterParam}
      options={characters?.map((c) => {
        return {
          label: c.name,
          value: c.id,
          // if you want to render your own component as an option, use renderedItem
          renderedItem: (
            <CharacterItem
              id={c.id}
              name={c.name.replace(
                new RegExp(filterParam, "gi"),
                (match) => `<b>${match}</b>`
              )}
              episode={c.episode.length}
              image={c.image}
            />
          ),
        };
      })}
    />
  );
};

export default App;

```
## Props
The following props are available for customizing the behavior and appearance of the MultiSelectAutoCompleteInput component:

- <strong>isLoading(boolean)</strong>: Indicates whether data is loading.
- <strong>onChangeInput (function)</strong>: Callback function triggered when the input value changes.
- <strong>options (array)</strong>: An array of options to display in the autocomplete dropdown. Each option should be an object with label and value properties. Additionally, you can include a renderedItem property to render custom content for each option.

## The Deployed(Vercel)
link: https://multi-select-autocomplete-component-pxbs.vercel.app/
