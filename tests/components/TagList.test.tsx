import { render, screen, waitFor } from '@testing-library/react';
import TagList from '../../src/components/TagList';

describe('TagList v1', () => {
  it('should render tags v1', async () => {
    render(<TagList />);

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  it('should render tags v2', async () => {
    render(<TagList />);

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });
});
