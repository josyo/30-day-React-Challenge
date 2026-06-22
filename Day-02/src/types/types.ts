export interface UserListProps {
    onSelectUser: (user: User) => void;
}

export interface User {
    id: number
    name: string
    email: string
    country: string
}

export interface UserCardProps {
    user: User;
    onSelectUser: (user:User) => void;
}