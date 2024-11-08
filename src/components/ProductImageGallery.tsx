const ProductImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
  if (imageUrls.length === 0) return null;

  return (
    <ul>
      {imageUrls.map((url, idx) => (
        <li key={idx}>
          <img src={url} data-testid={`img-${idx}`} />
        </li>
      ))}
    </ul>
  );
};

export default ProductImageGallery;
