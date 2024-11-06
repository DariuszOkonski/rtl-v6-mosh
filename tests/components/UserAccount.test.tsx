import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';
import { User } from '../../src/entities';

describe('UserAccount V1', () => {
  const testUser: User = {
    id: 1,
    name: 'Darek',
    isAdmin: true,
  };

  it('should render header', () => {
    render(<UserAccount user={testUser} />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  it('should render user name', () => {
    render(<UserAccount user={testUser} />);

    const user = screen.getByText(/darek/i);
    expect(user).toBeInTheDocument();
  });

  it('should render edit button if user is admin', () => {
    render(<UserAccount user={testUser} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it('should not render edit button if user is not admin', () => {
    testUser.isAdmin = false;
    render(<UserAccount user={testUser} />);

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});

describe('UserAccount V2', () => {
  it('should render user name', () => {
    const user: User = { id: 1, name: 'Mosh' };

    render(<UserAccount user={user} />);

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it('should render edit button if user is admin', () => {
    const user: User = { id: 1, name: 'Mosh', isAdmin: true };

    render(<UserAccount user={user} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it('should not render edit button if user is not admin', () => {
    const user: User = { id: 1, name: 'Mosh' };

    render(<UserAccount user={user} />);

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});
