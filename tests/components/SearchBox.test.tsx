import { render, screen } from '@testing-library/react';
import SearchBox from '../../src/components/SearchBox';
import userEvent from '@testing-library/user-event';

describe('SearchBox v1', () => {
  const renderSearchBox = () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);

    return {
      input: screen.getByPlaceholderText(/search/i),
      user: userEvent.setup(),
      onChange,
    };
  };

  it('should render an input field for searching', () => {
    const { input } = renderSearchBox();
    expect(input).toBeInTheDocument();
  });

  it('should call onChange when Enter is pressed', async () => {
    const { input, onChange, user } = renderSearchBox();

    await user.type(input, 'SearchTerm{enter}');

    expect(onChange).toHaveBeenCalledWith('SearchTerm');
  });

  it('should not call onChange if input field is empty', async () => {
    const { input, onChange, user } = renderSearchBox();

    await user.type(input, '{enter}');

    expect(onChange).not.toHaveBeenCalled();
  });
});

// TODO: write SearchBox v2 => repeat that lesson
