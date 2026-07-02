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
      return { ...state, loading: false, tasks: action.payload }
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
      tasks: state.tasks,
      loading: state.loading,
      error: state.error,
      loadTasks }
} 

interface MutationState {
  isSubmitting: boolean
  isDeleting: boolean
  isUpdatingStatus: boolean
  error: string | null
}

type MutationAction = 
  | {type: 'MUTATION_START'; field: 'isSubmitting' | 'isDeleting' | 'isUpdatingStatus'}
  | {type: 'MUTATION_SUCCESS'}
  | {type: 'MUTATION_ERROR', payload: string}
  

const initialAddState: MutationState = {
  isSubmitting: false,
  isDeleting: false,
  isUpdatingStatus: false,
  error: null
}

function mutationReducer(state: MutationState, action: MutationAction) {
  switch(action.type) {
    case 'MUTATION_START':
      return { ...state, isSubmitting: false, isDeleting: false, isUpdatingStatus: false, error: null, [action.field]: true }
    case 'MUTATION_SUCCESS':
      return { ...state, isSubmitting: false, isDeleting: false, isUpdatingStatus: false, error: null }
    case 'MUTATION_ERROR':
      return { ...state, isSubmitting: false, isDeleting: false, isUpdatingStatus: false, error: action.payload }
    default:
      return state
  }
}

export function useTaskMutations(options?: UseAddTaskOptions) {
  const [state, dispatch] = useReducer(mutationReducer, initialAddState)

  // Add task logic
  const addTask = async (newTaskData: Omit<Task, 'id'>) => {
    try {
      dispatch({ type: 'MUTATION_START', field: 'isSubmitting' })

      const response = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTaskData),
      });

      if (!response.ok) {
        throw new Error('Failed to add task to the database');
      }

      const createdTask = await response.json();
      dispatch({ type: 'MUTATION_SUCCESS' })

      // Trigger our success callback if it was provided
      if (options?.onSuccess) {
        options.onSuccess(createdTask);
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'An unexpected error occured'
      dispatch({ type: 'MUTATION_ERROR', payload: errMsg}) 
    }
  };

  
  // Delete task logic
  const deleteTask = async (id: number) => {
    try {
      dispatch({ type: 'MUTATION_START', field: 'isDeleting'})

      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error ('Failed to delete task')
      }

      dispatch({ type: 'MUTATION_SUCCESS'})
    }catch(err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'An unexpected error occured'
      dispatch({ type: 'MUTATION_ERROR', payload: errMsg})
    } 
  }


  // Update task logic
  const updateTaskStatus = async (task: Task, newStatus: Task['status']) => {
    try{
      dispatch({ type: 'MUTATION_START', field: 'isUpdatingStatus' })
      const response = await fetch(`http://localhost:4000/tasks/${task.id}`, {
        method: 'PATCH', // PATCH updates a partial piece of data rather than replacing it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status')
      }

      dispatch({ type: 'MUTATION_SUCCESS' })
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An unexpected error occured"
      dispatch({ type: 'MUTATION_ERROR', payload: errMsg })
    }
  }

  return { 
    addTask,
    deleteTask,
    updateTaskStatus,
    isSubmitting: state.isSubmitting,
    isDeleting: state.isDeleting,
    isUpdatingStatus: state.isUpdatingStatus,
    mutationError: state.error,
  };
}


