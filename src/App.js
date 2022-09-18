import React from "react";
import logo from './logo.svg';
import WordRow from './components/WordRow';
import './App.css';
import { checkGuess } from './utils/word-checker';

function App() {
  const WordOfTheDay = 'FORGO'
  const [guesses, setGuesses] = React.useState([]);
  const [currentWord, setCurrentWord] = React.useState('');

  const backspace = () => {
    setCurrentWord(prev => prev && prev.slice(0, -1));
  }
  const enter = () => {
    if(currentWord.length === 5) {
      setGuesses(prev => [...prev, currentWord])
      setCurrentWord("");
    }
  }
  const word = (letter) => {
    setCurrentWord(prev => prev + letter.toUpperCase())
  }

  const handleKeyDown = e => {
    let pressedKey = String(e.key)
    if (pressedKey === "Backspace") {
      backspace();
      return
    }

    if (pressedKey === "Enter") {
      enter();
      return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
      return
    } else {
      word(pressedKey)
    }
  }
  React.useEffect(() => {
    window.addEventListener('keyup', handleKeyDown);

    return () => {
      window.removeEventListener('keyup', handleKeyDown);
    };
  }, [currentWord]);

  return (
    <div className="App">
      <header className="App-header">
        {guesses.map(guess => 
          <WordRow word={guess} result={checkGuess(guess, WordOfTheDay)} />
        )}
        <WordRow word={currentWord} />
      </header>
    </div>
  );
}

export default App;