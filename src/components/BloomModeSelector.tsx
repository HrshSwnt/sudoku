import { useSudoku } from '../hooks/useSudoku';

type BloomMode = 'none' | 'rowcol' | 'radial';

export default function BloomModeSelector() {
    const { bloomMode, setBloomMode } = useSudoku();

    return (
        <div className="flex gap-2 mb-2 mt-2 items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Highlight Mode:</label>
            <select
                value={bloomMode}
                onChange={(e) => setBloomMode(e.target.value as BloomMode)}
                className="border-2 border-blue-400 dark:border-blue-600 rounded px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
            >
                <option value="none">None</option>
                <option value="rowcol">Row/Col</option>
                <option value="radial">Radial</option>
            </select>
        </div>
    );
}
