import { render, screen } from '@testing-library/react';
import UserList from '../../src/components/UserList';
import { User } from '../../src/entities';

describe('UserList V1', () => {
  it('should render no users when the users array is empty', () => {
    render(<UserList users={[]} />);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it('should render a list of users', () => {
    const users: User[] = [
      { id: 1, name: 'Mosh' },
      { id: 2, name: 'John' },
    ];
    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole('link', { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/users/${user.id}`);
    });
  });
});

describe('UserList V2', () => {
  it('should render message if no users', () => {
    render(<UserList users={[]} />);
    const message = screen.getByText(/no users/i);
    expect(message).toBeInTheDocument();
  });

  it('should render list of users if there are users', () => {
    const users: User[] = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Mosh' },
    ];
    render(<UserList users={users} />);

    const allUsers = screen.getAllByRole('link');
    expect(allUsers.length).toBe(2);

    users.forEach((user) => {
      const link = screen.getByRole('link', { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/users/${user.id}`);
    });
  });
});
