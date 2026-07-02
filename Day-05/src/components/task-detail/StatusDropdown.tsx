import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StatusDropdownProps } from '../../types/task'
import type {Task} from '../../types/task'
 


export default function StatusDropdown({ task, onUpdateStatus } : StatusDropdownProps) {
    return(
        <Select
            value={task.status}
            onValueChange={( newStatus) => 
                onUpdateStatus(task, newStatus as Task["status"])
            }
        >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value ="TODO">To do</SelectItem>
                <SelectItem value ="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value ="COMPLETED">Completed</SelectItem>
            </SelectContent>
        </Select>
    )
}