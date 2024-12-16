import './App.css';
import { useState } from "react";

function App() {
    const programColor = {
        python: 'blue',
        java: 'red',
        javascript: 'yellow',
        c: 'green',
        cpp: 'lightblue',
        ruby: 'crimson',
        php: 'darkblue',
        swift: 'orange',
        go: 'lightgreen',
        rust: 'rustorange',
        kotlin: 'purple',
        typescript: 'navyblue',
        r: 'lemonchiffon',
        scala: 'green',
        dart: 'teal',
        perl: 'pink',
        elixir: 'darkgreen',
        haskell: 'lightpurple',
        sql: 'lemonchiffon'
    };

    const [programLanguage, setProgramLanguage] = useState('');
    const [langColor, setLangColor] = useState('');
    const [trialRemaining, setTrialRemaining] = useState(20);
    const [success, setSuccess] = useState(0);
    const [failures, setFailures] = useState(0);
    const [results, setResults] = useState([]);
    const successSound = new Audio('/gameSucces.mp3');
    const failedSound = new Audio('/failed.mp3');

    function handleProgramLangChange(e) {
        setProgramLanguage(e.target.value);
    }

    function handleColorsChange(e) {
        setLangColor(e.target.value);
    }

    function handlePlayButton(e) {
        e.preventDefault();

        // Convert inputs to lowercase
        const languageInput = programLanguage.toLowerCase();
        const colorInput = langColor.toLowerCase();

        // Validation check
        if (!languageInput || !colorInput) {
            alert('Please enter both a programming language and its corresponding color.');
            return;
        }

        const result = programColor[languageInput] === colorInput ? 'win' : 'lose';

        if (result === 'lose') {
            setFailures(prevFailures => prevFailures + 1);
           // failedSound.play();
        } else {
            setSuccess(prevSuccess => prevSuccess + 1);
            //successSound.play();
        }

        // Store result
        setResults(prevResults => [
            ...prevResults,
            { attempt: results.length + 1, language: languageInput, result }
        ]);

        // Decrement trials remaining
        setTrialRemaining(prevTrials => prevTrials - 1);

        // Set inputs to empty after submission
        setProgramLanguage('');
        setLangColor('');
    }

    const isGameOver = failures >= 5 || trialRemaining === 0;

    return (
        <div>
            <h1>Programming Language Game</h1>
            <h3>Enter a programming language and its corresponding color</h3>
            <div>
                <form>
                    <input 
                        value={programLanguage}
                        onChange={handleProgramLangChange} 
                        type="text" 
                        placeholder="Programming Language" 
                    />
                    <br /><br />
                    <input 
                        value={langColor}
                        onChange={handleColorsChange} 
                        type="text" 
                        placeholder="Color" 
                    />
                    <br /><br />
                    <button 
                        onClick={handlePlayButton} 
                        disabled={failures >= 5 || trialRemaining === 0}
                    >
                        Play
                    </button>
                </form>
            </div>

            {/* Display last submitted language and result with background color */}
            {results.length > 0 && (
                <div style={{ backgroundColor: programColor[results[results.length - 1].language], padding: '10px' }}>
                    <h3>
                        {results[results.length - 1].language} {results[results.length - 1].result}
                    </h3>
                </div>
            )}

            <h3>Trials Remaining: {trialRemaining}</h3>
            {failures > 0 && <h3>Failures: {failures}</h3>}
            {failures >= 5 && <h3>Game Over! You have reached 5 failures.</h3>}
            {trialRemaining === 0 && <h3>Game Over! <br /> You have exhausted your remaining trials!</h3>}
        
            {/* Table of results appears only when the game is over */}
            {isGameOver && (
                <>
                    <h3>Results</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Attempt Number</th>
                                <th>Language</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(({ attempt, language, result }) => (
                                <tr key={attempt} style={{ backgroundColor: result === 'lose' ? 'red' : programColor[language] }}>
                                    <td>{attempt}</td>
                                    <td>{language}</td>
                                    <td>{result}</td>
                                </tr>  
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default App;