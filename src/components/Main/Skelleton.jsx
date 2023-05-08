import ContentLoader from 'react-content-loader';

const Skelleton = (props) => (
  <ContentLoader
    className="card"
    speed={2}
    width={280}
    height={447}
    viewBox="0 0 280 447"
    backgroundColor="#f0f0f0"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="260" rx="0" ry="0" width="280" height="20" />
    <rect x="0" y="300" rx="10" ry="10" width="280" height="83" />
    <rect x="0" y="413" rx="0" ry="0" width="90" height="22" />
    <rect x="176" y="400" rx="30" ry="30" width="104" height="44" />
  </ContentLoader>
);

export default Skelleton;
