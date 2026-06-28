import {useState} from 'react' 



export function CustomHookTest() {

    //What is a function hook: It's simply a function whose name starts with a use 
    function useCounter() {
        const [count, setCount] = useState(0)
        const increment = () => setCount(c => c + 1);
        return {
            count,
            increment
        }
    }



    const { count, increment } = useCounter();

    return(
        <div>

        </div>
    )
}