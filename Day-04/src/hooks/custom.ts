import {useState} from 'react'

interface useLocalStorageProps {
    initialValue: string
}
export default function useLocalStorage(
    initialValue: useLocalStorageProps
) {
    const [value, setValue] = useState(initialValue)

    return [value, setValue]
}