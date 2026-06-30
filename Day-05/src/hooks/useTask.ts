import { useEffect, useCallback, useReducer } from 'react'
import type { Task } from '../types/task'

interface UseAddTaskOptions {
  onSuccess?: (newTask: Task) => void;
}

interface FetchState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

type FetchAction = 
  | { type: 'FETCH_START' } 
  | { type: 'FETCH_SUCCESS', payload: Task[] } 
  | { type: 'FETCH_ERROR', payload: string};

const initialFetchState: FetchState = {
  tasks: [],
  loading: false,
  error: null,
}

function fetchReducer(state: FetchState, action: FetchAction) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, task: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload}
    default:
      return state;
  }
}

export function useFetchTask() {
    const [state, dispatch] = useReducer(fetchReducer, initialFetchState);

    
    const loadTasks = useCallback(async () => {
        try {
            dispatch({ type: 'FETCH_START' })
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            if (!response.ok) {
                throw new Error('Failed to load tasks');
            }
            
            const data = await response.json();
            dispatch({ type: 'FETCH_SUCCESS', payload: data })

        } catch (err: unknown) {
            const errMsg = err instanceof Error ? err.message : 'Unexpected Error';
            dispatch({ type: 'FETCH_ERROR', payload: errMsg })
        }
    }, []);    

    useEffect(() => {
        loadTasks()
    },[loadTasks])

    return {
      employees: state.tasks,
      loading: state.loading,
      error: state.error,
      loadTasks }
} 

interface AddState {
  isSubmitting: boolean
  submitError: string | null
}

type AddAction = 
  | {type: 'SUBMIT_START'}
  | {type: 'SUBMIT_SUCCESS'}
  | {type: 'SUBMIT_ERROR', payload: string}
  

const initialAddState: AddState = {
  isSubmitting: false,
  submitError: null
}

function AddReducer(state: AddState, action: AddAction) {
  switch(action.type) {
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, submitError: null }
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, submitError: null }
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, submitError: action.payload }
  }
}

export function useAddTask(options?: UseAddTaskOptions) {
  const [state, dispatch] = useReducer(AddReducer, initialAddState)

  const addTask = async (newEmployeeData: Omit<Task, 'id'>) => {
    try {
      dispatch({ type: 'SUBMIT_START'})

      const response = await fetch('https://your-real-api.com/v1/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployeeData),
      });

      if (!response.ok) {
        throw new Error('Failed to add task to the database');
      }

      const createdTask = await response.json();
      dispatch({ type: 'SUBMIT_SUCCESS' })

      // Trigger our success callback if it was provided
      if (options?.onSuccess) {
        options.onSuccess(createdTask);
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'An unexpected error occured'
      dispatch({ type: 'SUBMIT_ERROR', payload: errMsg}) 
    }
  };

  return { 
    addTask,
    isSubmitting: state.isSubmitting,
    submitError: state.submitError,
  };
}