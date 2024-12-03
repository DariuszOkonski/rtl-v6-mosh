import { render, screen } from '@testing-library/react';
import OrderStatusSelector from '../../src/components/OrderStatusSelector';
import userEvent from '@testing-library/user-event';
import { Theme } from '@radix-ui/themes';

describe('OrderStatusSelector v1', () => {
  it('should render New as the default value', () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    const button = screen.getByRole('combobox');
    expect(button).toHaveTextContent(/new/i);
  });

  it('should render correct statuses', async () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    const button = screen.getByRole('combobox');
    const user = userEvent.setup();
    await user.click(button);

    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(3);

    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(['New', 'Processed', 'Fulfilled']);
  });
});

describe('OrderStatusSelector v2', () => {
  const renderComponent = () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    return {
      button: screen.getByRole('combobox'),
      user: userEvent.setup(),
      getOptions: () => screen.findAllByRole('option'),
    };
  };

  it('should render New as the default value', () => {
    const { button } = renderComponent();
    expect(button).toHaveTextContent(/new/i);
  });

  it('should render correct statuses', async () => {
    const { user, button, getOptions } = renderComponent();

    await user.click(button);

    const options = await getOptions();
    expect(options).toHaveLength(3);

    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(['New', 'Processed', 'Fulfilled']);
  });
});
