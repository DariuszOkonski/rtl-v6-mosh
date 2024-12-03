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
    const onChange = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    return {
      button: screen.getByRole('combobox'),
      getOptions: () => screen.findAllByRole('option'),
      getOption: (label: RegExp) =>
        screen.findByRole('option', { name: label }),
      user: userEvent.setup(),
      onChange,
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

  it.each([
    { label: /processed/i, value: 'processed' },
    { label: /fulfilled/i, value: 'fulfilled' },
  ])(
    'should call onChange with $value when the $label option is selected',
    async ({ label, value }) => {
      const { button, user, onChange, getOption } = renderComponent();
      await user.click(button);

      const option = await getOption(label);
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  it('should call onChange with new when the new option is selected', async () => {
    const { button, user, onChange, getOption } = renderComponent();
    await user.click(button);

    const processedOption = await getOption(/processed/i);
    await user.click(processedOption);

    await user.click(button);
    const newOption = await getOption(/new/i);
    await user.click(newOption);

    expect(onChange).toHaveBeenCalledWith('new');
  });
});
