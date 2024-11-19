import ExpandableText from '../components/ExpandableText';

const longText =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia rem voluptatem ea impedit hic repudiandae. Dignissimos, incidunt sunt porro eligendi dolor aliquam harum suscipit dolorem veritatis, accusantium adipisci, aspernatur tenetur omnis fugiat facilis obcaecati harum facere odio debitis a illo sunt cum! Praesentium architecto quod voluptate.';

// const shortText = 'Lorem ipsum dolor sit amet';

const PlaygroundPage = () => {
  return <ExpandableText text={longText} />;
};

export default PlaygroundPage;
