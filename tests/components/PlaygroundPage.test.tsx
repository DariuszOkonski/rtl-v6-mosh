import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';
import userEvent from '@testing-library/user-event';

const longText =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia rem voluptatem ea impedit hic repudiandae. Dignissimos, incidunt sunt porro eligendi dolor aliquam harum suscipit dolorem veritatis, accusantium adipisci, aspernatur tenetur omnis fugiat facilis obcaecati harum facere odio debitis a illo sunt cum! Praesentium architecto quod voluptate.';

describe('ExpandableText', () => {
  it('should display only short text if less than limit', () => {
    render(<ExpandableText text='short text' />);

    const text = screen.getByText(/short text/i);
    expect(text).toBeInTheDocument();
  });

  it('should display long text with dots and button', () => {
    render(<ExpandableText text={longText} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent('...');

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should deploy long text if button is clicke', async () => {
    render(<ExpandableText text={longText} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();

    const user = userEvent.setup();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(article.textContent).toBe(longText);
  });
});
