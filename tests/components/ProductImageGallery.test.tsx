import { render, screen } from '@testing-library/react';
import ProductImageGallery from '../../src/components/ProductImageGallery';

describe('ProductImageGallery V1', () => {
  it('should return empty element if array of urls is empty', () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it('should render list of urls', () => {
    const imageUrls = ['http://one', 'http://two'];
    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole('listitem');
    expect(images.length).toBe(2);

    images.forEach((url, idx) => {
      const link = screen.getByTestId(`img-${idx}`);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('src', imageUrls[idx]);
    });
  });
});

describe('ProductImageGallery V2', () => {
  it('should render nothing if given an empty array', () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render a list of images', () => {
    const imageUrls = ['url1', 'url2'];
    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
    expect(images).toHaveLength(2);

    imageUrls.forEach((_, index) => {
      expect(images[index]).toHaveAttribute('src', imageUrls[index]);
    });
  });
});
