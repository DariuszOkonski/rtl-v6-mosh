import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';
import userEvent from '@testing-library/user-event';

const longText =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia rem voluptatem ea impedit hic repudiandae. Dignissimos, incidunt sunt porro eligendi dolor aliquam harum suscipit dolorem veritatis, accusantium adipisci, aspernatur tenetur omnis fugiat facilis obcaecati harum facere odio debitis a illo sunt cum! Praesentium architecto quod voluptate.';

describe('ExpandableText v1', () => {
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

describe('ExpandableText v2', () => {
  const limit = 255;
  const longText = 'a'.repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + '...';

  it('should render the full text if less than 255 characters', () => {
    const text = 'Short text';
    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('should truncate text if longer than 255 characters', () => {
    render(<ExpandableText text={longText} />);

    // const truncatedText = longText.substring(0, 255) + '...';
    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });

  it('should expand text when Show More button is clicked', async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it('should collapse text when Show Less button is clicked', async () => {
    render(<ExpandableText text={longText} />);

    const showMoreButton = screen.getByRole('button', { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole('button', { name: /less/i });
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
